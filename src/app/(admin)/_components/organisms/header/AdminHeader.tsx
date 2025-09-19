"use client";

import {ChevronDown, LogOut, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import AdminSidebarMobile from "@/app/(admin)/_components/organisms/sidebar/AdminSidebarMobile";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {CustomSession} from "@/types/login";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"; // Thêm imports này

export default function AdminHeader() {
  const { data: session } = useSession() as { data: CustomSession };
  const pathname = usePathname();

  const navigation = [
    { href: "/admin-dashboard", label: "Dashboard" },
    { href: "/doctor-manage", label: "Bác sĩ" },
    { href: "/patient-manage", label: "Bệnh nhân" },
    { href: "/service-manage", label: "Dịch vụ khám" },
    { href: "/schedule-manage", label: "Lịch làm việc" },
    { href: "/appointment-request-manage", label: "Hẹn khám" },
    { href: "/appointment-queue-manage", label: "Hàng chờ khám" },
    { href: "/revenue-manage", label: "Doanh thu" },
  ];
  
  return (
    <header className="fixed w-full h-16 bg-white border-b flex items-center justify-between px-4 shadow-sm z-50">
      {/* Left: Logo + Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <AdminSidebarMobile />
        <Link href="/admin-dashboard" className="flex items-center sm:pl-2 gap-2 hover:opacity-80 transition-opacity">
          <div className="relative h-8 w-20">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-base lg:text-lg font-bold text-primary">HOLA Doctor</span>
            <span className="text-xs text-gray-500 -mt-1">Admin Portal</span>
          </div>
        </Link>
      </div>

      {/* Middle: Navigation (desktop) */}
      <nav className="hidden md:flex gap-3 text-sm font-medium text-gray-600">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "hover:text-black transition-all duration-300 py-5 px-2 relative group",
              pathname === item.href && "text-black"
            )}
          >
            {item.label}
            <span
              className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-black transition-all duration-300",
                pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            />
          </Link>
        ))}
      </nav>

      {/* Right: User Info */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors outline-none cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src={""} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm font-medium">
                {session?.user?.email ?? "Admin"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}