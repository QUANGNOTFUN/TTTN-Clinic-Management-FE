import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="min-h-screen flex bg-gray-50 pt-20"> {/* pt để tránh bị header đè */}
                <Sidebar />
                <main className="flex-1 p-8">{children}</main>
            </div>
            <Footer />
        </>
    );
}
