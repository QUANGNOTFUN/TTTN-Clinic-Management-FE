"use client";

import {useEffect, useState} from "react";
import SidebarDesktop from "@/app/(user)/_component/organisms/sidebar/sidebarDesktop";
import SidebarMobile from "@/app/(user)/_component/organisms/sidebar/sidebarMobile";

export default function SidebarProfile({ className }: { className?: string }) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const handleResize = () => {
            if (window.innerWidth < 675) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        
        // chạy 1 lần khi mount
        handleResize();
        
        // lắng nghe sự kiện resize
        window.addEventListener("resize", handleResize);
        
        // cleanup khi unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    
    return (
        <div className={`${className}`}>
            {
                isMobile ? <SidebarMobile /> : <SidebarDesktop />
            }
        </div>
    );
}
