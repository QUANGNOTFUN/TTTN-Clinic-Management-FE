import React from "react";
import Header from "@/components/header/Header";
import SidebarProfile from "@/app/(user)/_component/organisms/sidebarProfile";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="min-h-screen flex bg-gray-50 pt-20"> {/* pt để tránh bị header đè */}
                <Header />
                <SidebarProfile />
                <main className="flex-1 p-8">
                  {children}
                </main>
            </div>
        </>
    );
}
