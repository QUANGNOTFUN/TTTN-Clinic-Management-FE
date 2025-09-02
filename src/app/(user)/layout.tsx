import React from "react";
import Header from "@/components/header/Header";
import SidebarProfile from "@/app/(user)/_component/organisms/sidebarProfile";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={""}>
            <Header />
            <div className="flex flex-col md:flex-row bg-gradient-to-r from-slate-200 to-gray-50">
                <SidebarProfile className={"pt-12 md:pt-16 h-full md:h-screen md:fixed bg-gradient-to-r from-slate-200 to-gray-50 "} />
                <main className={"md:ml-72 flex-1"}>
                    {children}
                </main>
            </div>
        </div>
    );
}
