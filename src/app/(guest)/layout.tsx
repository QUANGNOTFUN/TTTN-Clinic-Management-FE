import React from "react";
import Header from "@/components/header/Header";
import {Metadata} from "next";
import {Sticky} from "@/components/sticky/Sticky";

export const metadata: Metadata = {
    title: "Trang Chủ - Y Tế Thông Minh",
    description: "Khám phá các dịch vụ y tế chất lượng cao, đặt lịch dễ dàng.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Header />
            <Sticky />
            <main className="flex-grow">{children}</main>
        </div>
    );
}

