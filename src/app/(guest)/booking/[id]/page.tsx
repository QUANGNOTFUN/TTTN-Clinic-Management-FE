'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useLoading } from '@/app/context/loadingContext';

import { GET_PATIENT_BY_ID } from '@/libs/graphqls/queries/profile';
import { CREATE_APPOINTMENT } from '@/libs/graphqls/mutations/appointments';

import { useBookingForm } from '@/libs/hooks/appoiment/useBookingForm';
import { useBookingData } from '@/libs/hooks/appoiment/useBookingData';

import DoctorCard from './components/DoctorCard';
import DateSelector from './components/DateSelector';
import TimeSlotSelector from './components/TimeSlotSelector';
import PatientForm from './components/PatientForm';

export default function BookingPage() {
    const { id } = useParams();
    const doctorId = id as string;
    const { data: session } = useSession();
    const { enqueueSnackbar } = useSnackbar(); // Hook từ notistack
    const { setLoading } = useLoading();

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    const { data } = useQuery(GET_PATIENT_BY_ID, {
        variables: { input: { patient_id: session?.user?.id } },
        skip: !session?.user?.id,
    });

    const patient = data?.findOnePatient;
    const user = patient?.user;
    const { form, handleChange, resetForm } = useBookingForm(user, patient);

    const {
        doctor,
        doctorLoading,
        doctorError,
        availableDates,
        schedulesByDate,
        slots,
    } = useBookingData(doctorId, selectedDate, selectedScheduleId);

    const [createAppointment, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_APPOINTMENT, {
        onCompleted: () => {
            enqueueSnackbar('Đặt lịch thành công, đã gửi thông tin lịch khám về mail của bạn!', {
                variant: 'success', // Loại thông báo (success, error, warning, info)
                autoHideDuration: 3000, // Ẩn sau 3 giây
            });
            resetForm();
            setSelectedScheduleId(null);
            setSelectedSlotId(null);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlotId || !session?.user?.id) return;

        const selectedSlot = slots.find((s) => s.id === selectedSlotId);
        if (!selectedSlot) return;

        await createAppointment({
            variables: {
                input: {
                    doctor_id: doctorId,
                    patient_id: session.user.id,
                    slot_id: selectedSlotId,
                    status: 'PENDING',
                    appointment_date: new Date(selectedSlot.start_time).toISOString(),
                    appointment_type: 'consultation',
                    is_anonymous: false,
                    notes: JSON.stringify(form),
                },
            },
        });
    };

    useEffect(() => {
        setLoading(doctorLoading || mutationLoading);
    }, [doctorLoading, mutationLoading]);

    useEffect(() => {
        if (schedulesByDate.length > 0 && !selectedScheduleId) {
            setSelectedScheduleId(schedulesByDate[0].id);
            setSelectedSlotId(null);
        }
    }, [schedulesByDate, selectedScheduleId]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSelectedScheduleId(null);
        setSelectedSlotId(null);
    };

    if (doctorError) return <p className="text-red-500">Lỗi: {doctorError.message}</p>;
    if (doctorLoading) return <p>Đang tải...</p>;
    if (!doctor) return <p>Không tìm thấy bác sĩ.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-[64px]">
            <DoctorCard
                avatar={doctor.user.avatar}
                fullName={doctor.user.full_name}
                qualifications={doctor.qualifications}
                specialty={doctor.specialty}
                hospital={doctor.hospital}
                workSeniority={doctor.work_seniority}
                rating={doctor.rating}
                gender={doctor.gender}
                email={doctor.user.email}
                phone={doctor.user.phone}
                defaultFee={doctor.default_fee} // ← thêm dòng này
            />

            <hr className="my-8" />

            <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-zinc-50 border border p-2 rounded-md w-full md:w-1/2">
                    <div className={"bg-white border p-2 rounded-md shadow-sm mb-4"}>
                        <h2 className="text-lg font-semibold mb-4">Ngày khám</h2>
                        <DateSelector
                          doctorId={doctorId}
                          selectedDate={selectedDate}
                          onDateChange={handleDateChange}
                          availableDates={availableDates}
                        />
                    </div>
                    <div className={"bg-white border p-2 rounded-md shadow-sm"}>
                        <h2 className="text-lg font-semibold mb-4">Giờ khám</h2>
                        <TimeSlotSelector
                          slots={slots.map((slot) => ({
                              id: slot.id,
                              time: slot.start_time.slice(11, 16),
                              max_patients: slot.max_patients,
                              booked_count: slot.booked_count,
                          }))}
                          selectedSlotId={selectedSlotId}
                          onSelect={setSelectedSlotId}
                        />
                    </div>
                </div>

                <div className="bg-zinc-50 border border p-2 rounded-md w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4 text-center">Thông tin bệnh nhân</h2>
                        {mutationError && <p className="text-red-500">Lỗi: {mutationError.message}</p>}
                        <div className={"bg-white border p-2 rounded-md shadow-sm"}>
                            <PatientForm form={form} onChange={handleChange} />
                            <button
                              type="submit"
                              disabled={mutationLoading}
                              className={`w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-md cursor-pointer hover:bg-blue-700 transition ${
                                mutationLoading ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                                {mutationLoading ? 'Đang xử lý...' : 'Đặt lịch'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}