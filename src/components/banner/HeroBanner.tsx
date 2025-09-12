import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
    return (
        <section className="relative w-full h-[100vh] overflow-hidden">
            {/* Background image */}
            <Image
                src="/banner-001-1.jpg"
                alt="Medical Banner"
                fill
                className="object-cover brightness-75"
                priority
            />
            
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-start px-6 md:px-20">
                <div className="text-white max-w-2xl">
                    {/* Title */}
                    <h1
                        className="inline-block text-3xl md:text-5xl font-bold
                                    backdrop-blur-sm mb-6"
                    >
                        HolaDoctor xin chào quý khách
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl mb-6 leading-relaxed">
                        Cùng với đội ngũ y bác sĩ uy tín chuyên chữa trị, khám các bệnh liên quan đến HIV,
                        HolaDoctor hân hạnh được phục vụ.
                    </p>
                    
                    {/* Action Button */}
                    <Link href="/doctor">
                        <button
                            className="bg-teal-500 hover:bg-teal-600
                                       px-6 py-3 rounded-full font-semibold
                                       cursor-pointer transition-colors duration-300 shadow-md"
                        >
                            Đặt lịch khám ngay
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
