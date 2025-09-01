"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Calendar, FileText, HelpCircle, LogOut, Menu } from "lucide-react";

const navItems = [
    { href: "/profile", label: "Hồ sơ khám", icon: FileText },
    { href: "/profile/appointment", label: "Quản lý lịch hẹn", icon: Calendar },
    { href: "/profile/notifications", label: "Thông báo", icon: Bell },
];

export default function SidebarProfile() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    
    return (
      <>
          {/* Toggle button (Mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 m-2 rounded-lg border bg-white shadow-sm"
          >
              <Menu size={20} />
          </button>
          
          <aside
            className={`
          ${isOpen ? "w-60" : "w-20"}
          min-h-screen bg-white border-r px-3 py-6 flex flex-col justify-between shadow-sm
          transition-all duration-300
          fixed md:static z-40
        `}
          >
              {/* Header */}
              <div>
                  {isOpen && (
                    <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-tight">
                        Trang cá nhân
                    </h2>
                  )}
                  
                  {/* Nav */}
                  <nav className="space-y-2">
                      {navItems.map(({ href, label, icon: Icon }) => {
                          const isActive = pathname === href;
                          
                          return (
                            <Link
                              key={href}
                              href={href}
                              className={`
                    flex items-center ${
                                isOpen ? "gap-3 px-3" : "justify-center"
                              } py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                                isActive
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                              }
                  `}
                            >
                                <Icon size={18} className="shrink-0" />
                                {isOpen && <span>{label}</span>}
                            </Link>
                          );
                      })}
                  </nav>
              </div>
              
              {/* Footer */}
              <div className="pt-6 border-t space-y-2">
                  <button
                    className={`w-full flex items-center ${
                      isOpen ? "gap-3 px-3" : "justify-center"
                    } py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-all`}
                  >
                      <HelpCircle size={18} />
                      {isOpen && <span>Trợ giúp</span>}
                  </button>
                  <button
                    className={`w-full flex items-center ${
                      isOpen ? "gap-3 px-3" : "justify-center"
                    } py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all`}
                  >
                      <LogOut size={18} />
                      {isOpen && <span>Đăng xuất</span>}
                  </button>
              </div>
          </aside>
      </>
    );
}
