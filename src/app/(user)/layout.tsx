import React from "react";
import Header from "@/components/header/Header";
import SidebarProfile from "@/app/(user)/_component/organisms/sidebar/sidebarProfile";
import {Sticky} from "@/components/sticky/Sticky";
import {Metadata} from "next";
import ProtectedLayout from "@/app/(admin)/protectedLayout";

export const metadata: Metadata = {
    title: "Trang Chủ - Y Tế Thông Minh",
    description: "Khám phá các dịch vụ y tế chất lượng cao, đặt lịch dễ dàng.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"relative min-h-screen"}>
            <ProtectedLayout>
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
            </ProtectedLayout>
        </div>
    );
}