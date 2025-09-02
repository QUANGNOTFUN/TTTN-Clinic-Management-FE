"use client";

import {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Bell, Calendar, ContactIcon, ListCollapse, LogOut} from "lucide-react";

const navItems = [
    { href: "/profile", label: "Thông tin cá nhân", icon: ContactIcon },
    // { href: "/bookmarks", label: "Hồ sơ khám", icon: FileText },
    { href: "/appointment", label: "Quản lý lịch hẹn", icon: Calendar },
    { href: "/notifications", label: "Thông báo", icon: Bell },
];

export default function SidebarProfile(
    { className }: { className?: string }
) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className={`flex flex-col ${className}`}>
        
        {/* Toggle button (Mobile only) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden w-12 p-2 rounded-lg border shadow-sm cursor-pointer z-50`}
            >
                <ListCollapse className={"w-4 h-4 md:w-6 md:h-6 text-gray-600 m-auto"} />
            </button>
            
            {isOpen && (
                <aside
                    className={`
                    ${isOpen ? "md:w-72" : "w-12 mt-12"}
                    h-full border-r px-3 py-6 flex flex-col justify-between shadow-sm
                    transition-all duration-300
                    fixed md:static z-40
                `}
                >
                    {/* Nav */}
                    <nav className="space-y-3 text-xs sm:text-sm md:text-base font-semibold italic">
                        {navItems.map(({ href, label, icon: Icon }) => {
                            const isActive = pathname === href;
                            
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`
                                        flex items-center py-4 rounded-xl shadow-sm transition-all duration-200
                                            ${
                                                isOpen
                                                    ? "gap-3 px-3 "
                                                    : "justify-center "
                                            }
                                            ${
                                                isActive
                                                    ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-sm "
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 "
                                        }
                                `}>
                                    <Icon className="w-4 h-4 md:w-6 md:h-6" />
                                    {isOpen && <span>{label}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                    
                    {/* Footer */}
                    <div className="space-y-3 text-xs sm:text-sm md:text-base font-semibold italic">
                        <button
                            className={`w-full flex items-center py-4 rounded-xl shadow-sm cursor-pointer ${
                                isOpen ? "gap-3 px-3" : "justify-center"
                            } py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all`}
                        >
                            <LogOut className="w-4 h-4 md:w-6 md:h-6" />
                            {isOpen && <span>Đăng xuất</span>}
                        </button>
                    </div>
                </aside>
            )}
            
        </div>
    );
}
