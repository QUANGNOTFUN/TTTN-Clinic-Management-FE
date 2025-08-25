"use client";

import { FC, useState } from 'react';

const ContactPage: FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: Sẽ gửi dữ liệu khi có backend
        console.log('Form submitted:', formData);
        alert('Gửi tin nhắn thành công! (Chưa có backend, dữ liệu chỉ được log.)');
    };

    return (
        <section className="pt-20 pb-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Liên Hệ Với Chúng Tôi</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Thông tin liên hệ */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông Tin Liên Hệ</h2>
                        <p className="text-gray-600 mb-2">📞 Hotline: 1900 123 456</p>
                        <p className="text-gray-600 mb-2">✉️ Email: contact@yte.vn</p>
                        <p className="text-gray-600">🏥 Địa chỉ: 123 Đường Sức Khỏe, TP. Hồ Chí Minh</p>
                    </div>
                    {/* Form liên hệ */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gửi Tin Nhắn</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Nhập họ và tên"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Nhập email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                                    Tin nhắn
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    placeholder="Nhập tin nhắn của bạn"
                                    rows={4}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-transform"
                            >
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default ContactPage;