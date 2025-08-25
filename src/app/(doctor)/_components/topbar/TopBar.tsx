'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function TopbarDoctor() {
    const [time, setTime] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-white p-4 shadow-sm flex justify-between items-center relative z-40">
            <span className="text-gray-500 text-sm font-bold">
                Doctor Dashboard | {time.toLocaleTimeString()}
            </span>

            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-1 rounded text-sm"
                />

                <div className="relative">
                    {/* Avatar icon clickable */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer"
                        title="Tài khoản"
                    />

                    {/* Dropdown thông tin user */}
                    {isOpen && user && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50 text-sm p-4 space-y-2">
                            <p><strong>👤 Họ tên:</strong> {user.full_name || "--"}</p>
                            <p><strong>📧 Email:</strong> {user.email || "--"}</p>
                            <p><strong>📞 SĐT:</strong> {user.phone || "--"}</p>
                            <p><strong>🏠 Địa chỉ:</strong> {user.address || "--"}</p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
