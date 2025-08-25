import React from "react";
import HeroBanner from "@/components/banner/HeroBanner";

// src/app/(guest)/layout.tsx
export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeroBanner />
            <main className="flex-grow">{children}</main>
        </>
    );
}

