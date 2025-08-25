'use client';

import React from 'react';
import { X } from 'lucide-react';

export default function AppointmentDetailModal({ appointment, onClose }) {
    const dt = new Date(appointment.appointment_date);

    const formattedDate = dt.toISOString().slice(0, 10);
    const formattedTime = dt.toISOString().slice(11, 16);
    const statusText: Record<string, string> = {
        PENDING: 'Đang chờ',
        COMPLETED: 'Đã hoàn thành',
        CANCELLED: 'Đã hủy',
    };

    const typeText: Record<string, string> = {
        consultation: 'Tư vấn',
        checkup: 'Khám sức khỏe',
        followup: 'Tái khám',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-bold mb-4 text-indigo-700">Chi tiết lịch hẹn</h2>

                <div className="space-y-3 text-gray-700">
                    <p><strong>Ngày hẹn:</strong> {formattedDate}</p>
                    <p><strong>Giờ:</strong> {formattedTime}</p>
                    <p><strong>Trạng thái:</strong> {statusText[appointment.status] || appointment.status}</p>
                    <p><strong>Loại khám:</strong> {typeText[appointment.appointment_type] || 'Không xác định'}</p>
                    <div className="flex items-center gap-2">
                        <img
                            src={appointment.doctor?.user?.avatar}
                            alt="Avatar bác sĩ"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <p><strong>Bác sĩ:</strong> {appointment.doctor?.user?.full_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
