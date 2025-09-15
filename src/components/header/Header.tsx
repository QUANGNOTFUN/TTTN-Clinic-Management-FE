'use client'

import DesktopHeader from "@/components/header/DesktopHeader";
import {useEffect, useState} from "react";
import MobileHeader from "@/components/header/MobileHeader";

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 675) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div>
            { isMobile ? <MobileHeader /> : <DesktopHeader /> }
        </div>
    )
}
