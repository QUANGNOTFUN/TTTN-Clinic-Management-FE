import React from "react";
import Footer from "@/app/(guest)/(home)/_component/footer/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

