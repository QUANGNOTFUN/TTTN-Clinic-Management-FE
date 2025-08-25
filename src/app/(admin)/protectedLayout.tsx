"use client";

import useAuth from "@/libs/hooks/auth/useAuth";
import { ReactNode } from "react";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
    const {session, status} = useAuth();

    if(status === "loading"){
        return <div></div>
    }
    if(!session) {
        return null;
    }

    return (
        <div className='bg-gray-100  items-center justify-center'>
            {children}
        </div>
    )
}

export default ProtectedLayout;