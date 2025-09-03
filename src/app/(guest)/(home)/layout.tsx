import React from "react";
import HeroBanner from "@/components/banner/HeroBanner";
import Footer from "@/components/footer/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeroBanner />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}

