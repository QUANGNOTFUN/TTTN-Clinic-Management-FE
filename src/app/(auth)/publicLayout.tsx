"use client";

import { ReactNode } from "react";
import useAuthenticated from "@/libs/hooks/auth/useAuthenticated";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    const { session, status } = useAuthenticated();
    if (status === "loading") {
        return <div></div>
    }
    if (session) {
        return null;
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default PublicLayout;