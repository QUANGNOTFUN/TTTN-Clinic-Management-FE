'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
    return (
        <section className="relative w-full h-[100vh] overflow-hidden">
            {/* Background image */}
            <Image
                src="/banner-001-1.jpg" // <-- Đặt đúng ảnh tương tự bạn gửi
                alt="Medical Banner"
                fill
                className="object-cover brightness-75"
                priority
            />

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">HolaDoctor xin chào quý khách</h1>
                <p className="max-w-xl mb-6 text-lg">
                    Cùng với đội ngũ y bác sĩ uy tin chuyên chữa trị, khám các bệnh liên quan đến HIV, HolaDoctor hân hạnh được phục vụ.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">

                    <Link href="/doctor">
                        <button className="bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-full font-semibold cursor-pointer transition-colors duration-300">
                            Đặt lịch khám ngay
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
}
