"use client";

import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Định nghĩa type cho poster
interface Poster {
    id: number;
    image: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

// Danh sách poster mẫu
const posters: Poster[] = [
    {
        id: 1,
        image: '/image/poster1.jpg',
        title: 'Khám sức khỏe miễn phí',
        description: 'Đăng ký ngay hôm nay để nhận ưu đãi khám tổng quát miễn phí!',
        ctaText: 'Đặt lịch ngay',
        ctaLink: '/booking',
    },
    {
        id: 2,
        image: '/image/poster2.jpg',
        title: 'Tư vấn online 24/7',
        description: 'Kết nối với bác sĩ mọi lúc, mọi nơi với dịch vụ tư vấn trực tuyến.',
        ctaText: 'Tìm hiểu thêm',
        ctaLink: '/services',
    },
    {
        id: 3,
        image: '/image/poster3.jpg',
        title: 'Gói xét nghiệm hiện đại',
        description: 'Công nghệ tiên tiến, kết quả nhanh chóng trong 24h.',
        ctaText: 'Xem chi tiết',
        ctaLink: '/services',
    },
];

const PosterCarousel: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Tự động chuyển poster mỗi 5 giây
    useEffect(() => {
        let interval: NodeJS.Timeout;
        const startInterval = () => {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
            }, 5000);
        };
        startInterval();
        return () => clearInterval(interval);
    }, []);

    // Xử lý nút prev/next
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + posters.length) % posters.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    };

    // Xử lý click vào dot
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section
            className="relative bg-gradient-to-r from-blue-100 to-gray-100 py-4 shadow-md"
            role="region"
            aria-label="Promotional carousel"
            // onMouseEnter={() => clearInterval(interval)}
            // onMouseLeave={() => startInterval()}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Carousel container */}
                <div className="relative overflow-hidden rounded-lg h-[450px] md:h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '-100%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="absolute inset-0 flex flex-col md:flex-row items-center"
                        >
                            {/* Hình ảnh */}
                            <div className="md:w-1/2">
                                <Image
                                    src={posters[currentIndex].image}
                                    alt={posters[currentIndex].title}
                                    width={600}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="w-full h-64 md:h-full object-cover rounded-lg"
                                    priority={currentIndex === 0}
                                />
                            </div>
                            {/* Nội dung */}
                            <div className="md:w-1/2 p-6 text-center md:text-left">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{posters[currentIndex].title}</h3>
                                <p className="text-gray-600 mb-4">{posters[currentIndex].description}</p>
                                <a
                                    href={posters[currentIndex].ctaLink}
                                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-transform"
                                >
                                    {posters[currentIndex].ctaText}
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Nút prev/next */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
                        aria-label="Previous slide"
                    >
                        ❮
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100"
                        aria-label="Next slide"
                    >
                        ❯
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {posters.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full ${
                                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PosterCarousel;