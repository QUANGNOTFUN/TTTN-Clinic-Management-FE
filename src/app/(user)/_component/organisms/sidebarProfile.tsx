"use client";

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Bell, Calendar, ContactIcon, LogOut, PanelLeftCloseIcon, PanelLeftOpenIcon} from "lucide-react";

export default function SidebarProfile({ className }: { className?: string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    
    const navItems = [
        { href: "/profile", label: "Thông tin cá nhân", icon: ContactIcon },
        { href: "/appointment", label: "Quản lý lịch hẹn", icon: Calendar },
        { href: "/notifications", label: "Thông báo", icon: Bell },
    ];
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(true);
            } else {
                setIsOpen(true);
            }
        };
        
        // chạy 1 lần khi mount
        handleResize();
        
        // lắng nghe sự kiện resize
        window.addEventListener("resize", handleResize);
        
        // cleanup khi unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    
    return (
        <div className={`${className}`}>
            {/* Toggle button (Mobile only) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={
                    "fixed md:hidden top-13 left-1 " +
                    "p-2 rounded-lg shadow-sm cursor-pointer z-50 " +
                    "bg-zinc-100 hover:bg-zinc-200 focus:bg-zinc-300 " +
                    "border "
                }
            >
                {
                    isOpen
                        ?  <PanelLeftCloseIcon className={"w-5 h-5 text-gray-600 m-auto"} />
                        : <PanelLeftOpenIcon className={"w-5 h-5 text-gray-600 m-auto"} />
                }
            </button>
            
            {isOpen && (
                <aside
                    className={
                        "flex flex-row md:flex-col " +
                        "fixed md:block  " +
                        "w-full md:w-[20vw] px-4 py-4 "
                    }
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
                                        flex items-center py-2 md:py-4 rounded-xl shadow-sm transition-all duration-200
                                        ${isOpen ? "gap-3 px-3 " : "justify-center "}
                                        ${
                                            isActive
                                                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow-sm "
                                                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 "
                                        }
                                    `}
                                >
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                    {isOpen && <span className={"hidden md:block"}>{label}</span>}
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
                            {isOpen && <span className={"hidden md:block"}>Đăng xuất</span>}
                        </button>
                    </div>
                </aside>
            )}
        </div>
    );
}
