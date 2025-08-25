'use client';

import { Loader } from 'lucide-react';
import { isToday, isAfter } from 'date-fns';
import { useGetAppointments } from '@/libs/hooks/appoiment/useGetAppointment';
import { useSession } from 'next-auth/react';

export default function DoctorDashboardPage() {
    const { data: session } = useSession();
    const doctorId = session?.user?.id;
    const page = 1;
    const pageSize = 100;

    const {
        appointments,
        total,
        loading: initLoading,
        error: errorAppointments,
    } = useGetAppointments({ doctor_id: doctorId, page, pageSize });

    const appointmentList = appointments || [];

    const todayAppointments = appointmentList.filter(a => isToday(new Date(a.appointment_date)));
    const upcomingAppointments = appointmentList.filter(a => isAfter(new Date(a.appointment_date), new Date()));

    const confirmedAppointments = todayAppointments.filter(a => a.status === 'CONFIRMED');
    const pendingAppointments = todayAppointments.filter(a => a.status === 'PENDING');
    const rejectedAppointments = todayAppointments.filter(a => a.status === 'CANCELED');
    const finishedAppointments = todayAppointments.filter(a => a.is_done === true); // ✅ fixed

    // Hàm format về định dạng yyyy-MM-dd HH:mm:ss.SSS
    function formatDateTime(date: Date) {
        const yyyy = date.getFullYear();
        const MM = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        const ms = String(date.getMilliseconds()).padStart(3, '0');

        return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}.${ms}`;
    }

    if (initLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    if (errorAppointments) {
        return (
            <div className="text-red-500 text-center mt-10">
                {errorAppointments.name}: {errorAppointments.message}
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col p-6 bg-gray-100">
            <div className="flex flex-1 space-x-6">
                {/* Tổng quan hôm nay */}
                <div className="w-1/3 p-4 bg-white rounded-xl shadow overflow-y-auto max-h-[600px]">
                    <h2 className="text-lg font-semibold mb-4">Tổng quan hôm nay</h2>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Tổng cuộc hẹn hôm nay</span>
                            <span className="font-bold text-blue-600">{todayAppointments.length}</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Đã xác nhận</span>
                            <span className="font-bold text-green-600">{confirmedAppointments.length}</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Chờ xác nhận</span>
                            <span className="font-bold text-yellow-600">{pendingAppointments.length}</span>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow flex justify-between">
                            <span>Đã từ chối</span>
                            <span className="font-bold text-red-600">{rejectedAppointments.length}</span>
                        </div>
                    </div>
                </div>

                {/* Cuộc hẹn sắp tới */}
                <div className="w-1/3 p-4 bg-white rounded-xl shadow overflow-y-auto max-h-[600px]">
                    <h2 className="text-lg font-semibold mb-4">Cuộc hẹn sắp tới</h2>
                    {upcomingAppointments.length === 0 ? (
                        <p className="text-sm text-gray-500">Không có cuộc hẹn nào.</p>
                    ) : (
                        <ul className="space-y-3">
                            {upcomingAppointments.slice(0, 5).map((item, index) => (
                                <li
                                    key={index}
                                    className="border border-gray-200 rounded-md p-3 shadow-sm hover:bg-gray-50"
                                >
                                    <div className="text-sm font-medium text-gray-800">{item.patient.user.full_name}</div>
                                    <div className="text-sm text-gray-600">{formatDateTime(new Date(item.appointment_date))}</div>
                                    <div
                                        className={`text-xs mt-1 ${
                                            item.status === 'CONFIRM'
                                                ? 'text-green-600'
                                                : item.status === 'PENDING'
                                                    ? 'text-yellow-600'
                                                    : item.status === 'CANCEL'
                                                        ? 'text-red-600'
                                                        : 'text-gray-400'
                                        }`}
                                    >
                                        {item.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Cuộc hẹn đã hoàn tất */}
                <div className="w-1/3 p-4 bg-white rounded-xl shadow overflow-y-auto max-h-[600px]">
                    <h2 className="text-lg font-semibold mb-4">Đã khám hôm nay</h2>
                    {finishedAppointments.length === 0 ? (
                        <p className="text-sm text-gray-500">Chưa có cuộc hẹn nào hoàn tất.</p>
                    ) : (
                        <ul className="space-y-3">
                            {finishedAppointments.map((item, index) => (
                                <li
                                    key={index}
                                    className="border border-gray-200 rounded-md p-3 shadow-sm hover:bg-gray-50"
                                >
                                    <div className="text-sm font-medium text-gray-800">{item.patient.user.full_name}</div>
                                    <div className="text-sm text-gray-600">{formatDateTime(new Date(item.appointment_date))}</div>
                                    <div className="text-xs mt-1 text-blue-600">Đã khám</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
