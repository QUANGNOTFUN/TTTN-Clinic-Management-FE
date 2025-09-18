import React from "react";
import Header from "@/components/header/Header";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            { children }
        </div>
    );
}
