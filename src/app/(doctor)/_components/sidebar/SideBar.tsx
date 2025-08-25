'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // ✅ Import signOut
import {
    Calendar, Users, MessageSquare, Home,
    LayoutDashboard, CreditCard, HelpCircle,
    Settings, LogOut, Menu
} from 'lucide-react';

export interface SideBarDoctor {
    label: string;
    href: string;
    icon: string;
}

const mainItems: SideBarDoctor[] = [
    { label: "Trang chủ", href: "/dash-board", icon: "dashboard" },
    { label: "Quản lý cuộc hẹn", href: "/appointment-manage", icon: "calendar" },
    { label: "Khám bệnh", href: "/patient", icon: "users" },
    { label: "Bài đăng", href: "/blog", icon: "message" },
];

const bottomItems: SideBarDoctor[] = [
    { label: "Giúp đỡ", href: "/help", icon: "help" },
    { label: "Cài đặt", href: "/setting", icon: "settings" },
    { label: "Đăng xuất", href: "/logout", icon: "logout" },
];

const getIconComponent = (icon: string) => {
    switch (icon) {
        case 'dashboard': return <LayoutDashboard className="w-5 h-5" />;
        case 'calendar': return <Calendar className="w-5 h-5" />;
        case 'users': return <Users className="w-5 h-5" />;
        case 'message': return <MessageSquare className="w-5 h-5" />;
        case 'payment': return <CreditCard className="w-5 h-5" />;
        case 'help': return <HelpCircle className="w-5 h-5" />;
        case 'settings': return <Settings className="w-5 h-5" />;
        case 'logout': return <LogOut className="w-5 h-5" />;
        default: return <Home className="w-5 h-5" />;
    }
};

export default function SidebarDoctor() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-white border-r shadow-sm p-4 h-screen flex flex-col justify-between`}>
            <div>
                <button onClick={() => setIsOpen(!isOpen)} className="mb-6">
                    <Menu />
                </button>

                <h2 className={`text-xl font-bold mb-6 ${isOpen ? '' : 'hidden'}`}>Doctor Panel</h2>

                <nav className="space-y-3">
                    {mainItems.map((item) => (
                        <Link key={item.label} href={item.href}>
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                                {getIconComponent(item.icon)}
                                {isOpen && <span>{item.label}</span>}
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            <nav className="space-y-3">
                {bottomItems.map((item) => {
                    if (item.icon === "logout") {
                        return (
                            <button
                                key={item.label}
                                onClick={() => signOut()}
                                className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded text-left"
                            >
                                {getIconComponent(item.icon)}
                                {isOpen && <span>{item.label}</span>}
                            </button>
                        );
                    }

                    return (
                        <Link key={item.label} href={item.href}>
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                                {getIconComponent(item.icon)}
                                {isOpen && <span>{item.label}</span>}
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
