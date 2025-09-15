"use client"

import React, {useState} from "react"
import { useFindAllAppointmentRequest } from "@/lib/hooks/appointment-request/useFindAllAppointmentRequest"
import { AppointmentRequestCard } from "@/app/(user)/appointment/_component/molecules/AppointmentRequestCard"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarX2 } from "lucide-react"
import {FilterBarAppointmentRequest} from "@/app/(user)/appointment/_component/molecules/FilterBarAppointmentRequest";

export default function AppointmentsPage() {
    const { data, isLoading, isError, error } = useFindAllAppointmentRequest()
    const [statusFilter, setStatusFilter] = useState("")
    
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
                Lỗi tải dữ liệu: {error.message}
            </div>
        )
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-4xl italic font-bold text-gray-700 mb-8 text-center tracking-wide">
                Danh sách lịch hẹn
            </h1>
            
            {/* Filter Badge */}
            <div className="flex justify-between p-4 ">
                <FilterBarAppointmentRequest value={statusFilter} onChange={setStatusFilter} />
            </div>
            
            {/* Loading state với skeleton */}
            {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                        </div>
                    ))}
                </div>
            ) : data && data.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((appointment) => (
                        <AppointmentRequestCard
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 mt-12">
                    <CalendarX2 className="h-12 w-12 mb-3 text-gray-400" />
                    <p className="text-lg font-medium">Không có lịch hẹn nào</p>
                </div>
            )}
        </div>
    )
}
