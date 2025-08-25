"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Bell,
    Calendar,
    FileText,
    HelpCircle,
    LogOut,
} from "lucide-react";

const navItems = [
    { href: "/profile", label: "Hồ sơ khám", icon: FileText },
    { href: "/profile/appointment", label: "Quản lý lịch hẹn", icon: Calendar },
    { href: "/profile/notifications", label: "Thông báo", icon: Bell },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-full bg-white border-r px-6 py-5 flex flex-col justify-between shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6 tracking-tight">Trang cá nhân</h2>
                <nav className="space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm font-medium
                  ${isActive
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                                }`}
                            >
                                <Icon size={18} className="shrink-0" />
                                {label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="pt-6 border-t space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-blue-700 hover:bg-gray-100 transition-all">
                    <HelpCircle size={18} />
                    Trợ giúp
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all">
                    <LogOut size={18} />
                    Đăng xuất
                </button>
            </div>
        </aside>
    );
}
