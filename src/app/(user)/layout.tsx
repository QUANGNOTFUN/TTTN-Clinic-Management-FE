import React from "react";
import Header from "@/components/header/Header";
import SidebarProfile from "@/app/(user)/_component/organisms/sidebar/sidebarProfile";
import {Sticky} from "@/components/sticky/Sticky";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"relative min-h-screen"}>
            <Header />
            <div className="flex flex-col md:flex-row  bg-gradient-to-br from-slate-300 via-zinc-200 to-gray-100 sm:bg-none">
                <Sticky />
                
                {/* Sidebar and optimize responsive */}
                <SidebarProfile className={"static w-[20vw] pt-12 md:border-r"} />
                
                {/* Main content */}
                <main className={"md:mt-12 flex-1 "}>
                    {children}
                </main>
            </div>
        </div>
    );
}