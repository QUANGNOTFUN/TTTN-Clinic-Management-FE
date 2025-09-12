'use client';

import React from 'react';
import { CalendarCheck, Clock, Stethoscope } from 'lucide-react';

export default function AppointmentsLandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                    <CalendarCheck className="h-8 w-8 text-indigo-600" />
                    Quản lý lịch hẹn
                </h1>
                
                {/* Giới thiệu */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Tại <span className="font-bold text-indigo-600">HolaDoctor</span>, bạn có thể dễ dàng quản lý
                        lịch hẹn khám bệnh của mình mọi lúc, mọi nơi. Trang quản lý lịch hẹn cho phép bạn:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Xem danh sách tất cả các lịch hẹn đã đặt.</li>
                        <li>Theo dõi trạng thái lịch hẹn: Đang chờ, Hoàn thành, hoặc Đã hủy.</li>
                        <li>Hủy lịch hẹn nếu có sự thay đổi đột xuất.</li>
                        <li>Xem chi tiết thông tin bác sĩ và thời gian khám.</li>
                    </ul>
                    
                    {/* Ví dụ minh họa */}
                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ví dụ giao diện</h2>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                                <div className="flex items-center gap-3 text-gray-900 font-semibold">
                                    <Clock className="h-5 w-5 text-indigo-600" />
                                    <span>2025-09-10 lúc 08:30</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Stethoscope className="h-5 w-5 text-indigo-600" />
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="/doctor-avatar.jpg"
                                            alt="Avatar bác sĩ"
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                        <span>
                      Bác sĩ: <span className="font-medium">Nguyễn Văn A</span>
                    </span>
                                    </div>
                                </div>
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 ring-1 ring-amber-200">
                                    Đang chờ
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="pt-6 text-center">
                        <p className="text-gray-700 mb-4">
                            Hãy đặt lịch khám ngay hôm nay để được phục vụ tốt nhất.
                        </p>
                        <a
                            href="/doctor"
                            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Đặt lịch ngay
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
