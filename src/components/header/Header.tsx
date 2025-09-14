'use client';

import Link from 'next/link';
import {BookHeartIcon, CalendarPlusIcon, Home, LibraryBigIcon, LogInIcon, User2Icon} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {NavItem, NavItemProps} from "@/components/header/NavItem";
import {AuthButton} from "@/components/header/AuthButton";

export default function Header() {
    const { data: session } = useSession();
    
    const lNavLinks: NavItemProps[] = [
        { item: { href: '/doctor', label: 'Bác sĩ', icon: <User2Icon /> } },
        { item: { href: '/booking', label: 'Đặt lịch khám', icon: <CalendarPlusIcon /> } },
    ];
    const rNavLinks: NavItemProps[] = [
        { item: { href: '/appointment', label: 'Lịch hẹn', icon: <BookHeartIcon /> } },
        { item: { href: '/health-tip', label: 'Tài liệu', icon: <LibraryBigIcon /> } },
    ];
    
    return (
        <header
            className={
                "fixed min-w-screen top-0 z-50 "
            }
        >
            <div className="flex items-top md:px-12 text-nowrap text-ellipsis">
                {/* Left Nav */}
                <nav
                    className={
                        "flex-4 flex items-center justify-end gap-4 " +
                        "px-4 w-full h-12 md:rounded-bl-4xl " +
                        "bg-gradient-to-r from-teal-500 to-teal-700 "
                    }
                >
                    {lNavLinks.map(link => (
                        <NavItem
                            key={link.item.href}
                            className={
                                "px-4 py-1.5 shadow border-teal-300 rounded-sm " +
                                "text-base font-medium text-zinc-200 hover:text-zinc-600 " +
                                "bg-teal-600 hover:bg-teal-500 " +
                                "hover:scale-[1.1] transition duration-200"
                            }
                            item={link.item}
                        />
                    ))}
                </nav>
                
                {/* Home Nav Item (center) */}
                <div
                    className={
                        "flex-3 flex items-center " +
                        "w-full h-12 " +
                        "bg-gradient-to-r from-teal-100 to-teal-500 "
                    }
                >
                    <NavItem
                        className={"mx-auto px-4 py-1.5 shadow-sm rounded-lg md:rounded-none md:shadow-none " +
                            "bg-teal-600 hover:bg-teal-500 md:bg-transparent md:hover:bg-transparent " +
                            "text-2xl font-semibold text-zinc-200  " +
                            "hover:scale-[1.1] transition duration-200"}
                        item={{
                            href: "/",
                            label: "Hola Doctor",
                            icon: <Home className="w-8 h-8 text-zinc-200" />
                        }}
                    />
                </div>
                
                {/* Right Nav + Auth */}
                <div
                    className={
                        "flex-4 flex items-center gap-2 " +
                        "px-4 w-full h-12 rounded-br-lg md:rounded-br-4xl " +
                        "bg-gradient-to-l from-teal-500 to-teal-700 "
                    }
                >
                    <nav
                        className={
                            "flex-1 flex items-center justify-start gap-4 "
                        }
                    >
                        {rNavLinks.map(link => (
                            <NavItem
                                key={link.item.href}
                                className={
                                    "px-4 py-1.5 shadow-sm rounded-lg " +
                                    "text-base font-medium text-zinc-200 hover:text-zinc-600 " +
                                    "bg-teal-600 hover:bg-teal-400 " +
                                    "hover:scale-[1.1] transition duration-200"
                                }
                                item={link.item}
                            />
                        ))}
                    </nav>
                    
                    {/* Auth Button */}
                    {!session?.user ? (
                        <Link
                            href={"/login"}
                            className={
                                "text-teal-100 hover:text-zinc-600 font-medium " +
                                "px-2 py-1 rounded-lg shadow-sm " +
                                "bg-white/10 hover:bg-white/20 transition"
                            }
                        >
                            <div className={"flex items-center gap-2"}>
                                <LogInIcon className="w-4 h-4" />
                                <span className={"hidden md:flex"}> { "Đăng nhập" } </span>
                            </div>
                        </Link>
                    ) : (
                        <AuthButton />
                    )}
                </div>
            </div>
        </header>
    );
}
