import React from "react";
import Header from "@/components/header/Header";
import SidebarProfile from "@/app/(user)/_component/organisms/sidebarProfile";
import {Sticky} from "@/components/sticky/Sticky";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"relative min-h-screen"}>
            <Header />
            <div className="flex flex-col md:flex-row bg-gradient-to-r from-slate-200 to-gray-50">
                <Sticky />
                
                {/* Sidebar and optimize responsive */}
                <SidebarProfile className={"static bg-zinc-50 border-r w-[20vw] pt-12"} />
                
                {/* Main content */}
                <main className={"md:mt-12 flex-1"}>
                    {children}
                </main>
            </div>
        </div>
    );
}