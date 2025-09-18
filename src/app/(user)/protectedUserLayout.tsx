"use client"

import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import React, {useEffect} from "react"
import {CustomSession, Role} from "@/types/login";

export default function ProtectedUserLayout({ children }: { children: React.ReactNode }) {
    const { data, status } = useSession() as { data: CustomSession, status: string }
    const router = useRouter()
    
    
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])
    
    
    useEffect(() => {
        if (data?.user) {
            const user = data?.user
            if (
                (user.role !== Role.PATIENT)
            ) {
                router.push("/login");
            }
        }
    }, [data?.user, router]);
    
    return <>{children}</>
}