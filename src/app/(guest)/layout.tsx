import React from "react";
import Header from "@/components/header/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main className="flex-grow">{children}</main>
        </div>
    );
}

