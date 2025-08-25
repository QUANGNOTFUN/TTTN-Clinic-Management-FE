import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_DOCTOR } from '@/libs/graphqls/doctors';
import { GET_SCHEDULE_DATES, GET_SCHEDULES_BY_DATE } from '@/libs/graphqls/queries/doctor-schedules';
import { GET_SLOTS_BY_SCHEDULE } from '@/libs/graphqls/queries/appointment-slot';

export const useBookingData = (doctorId: string, selectedDate: string, selectedScheduleId: number | null) => {
    const [slots, setSlots] = useState([]);

    const { data: doctorData, loading: doctorLoading, error: doctorError } = useQuery(GET_DOCTOR, {
        variables: { id: doctorId },
        fetchPolicy: 'no-cache',
    });

    const { data: scheduleDatesData } = useQuery(GET_SCHEDULE_DATES, {
        variables: { doctor_id: doctorId },
    });

    const { data: schedulesByDate } = useQuery(GET_SCHEDULES_BY_DATE, {
        variables: { doctor_id: doctorId, date: selectedDate },
        skip: !selectedDate,
    });

    const { data: slotData } = useQuery(GET_SLOTS_BY_SCHEDULE, {
        variables: { id: selectedScheduleId },
        skip: !selectedScheduleId,
    });

    useEffect(() => {
        if (slotData?.getAppointmentSlotByScheduleId) {
            setSlots(slotData.getAppointmentSlotByScheduleId);
        } else {
            setSlots([]);
        }
    }, [slotData]);

    return {
        doctor: doctorData?.doctor,
        doctorLoading,
        doctorError,
        availableDates: scheduleDatesData?.getAvailableScheduleDates || [],
        schedulesByDate: schedulesByDate?.getDoctorSchedulesIdByDate || [],
        slots,
    };
};
