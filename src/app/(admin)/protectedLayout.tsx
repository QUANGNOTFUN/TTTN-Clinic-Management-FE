"use client";

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

function useAuth(): { session: any; status: any; } {
    throw new Error("Function not implemented.");
}
