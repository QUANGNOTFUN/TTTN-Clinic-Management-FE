"use client"

import React, {useState} from "react"
import {useFindAllAppointmentRequestById} from "@/lib/hooks/appointment-request/useFindAllAppointmentRequestById"
import {AppointmentRequestCard} from "@/app/(user)/appointment/_component/molecules/AppointmentRequestCard"
import {Skeleton} from "@/components/ui/skeleton"
import {CalendarX2} from "lucide-react"
import {
    AppointmentRequestFilterBadge,
    AppointmentRequestFilterBadgeProps
} from "@/app/(user)/appointment/_component/molecules/AppointmentRequestFilterBadge";
import {useClientFilter} from "@/lib/hooks/filters/useClientFilter";
import {useSession} from "next-auth/react";
import {CustomSession} from "@/types/login";
import {AppointmentRequest} from "@/types/appointment-request";
import {useCancelAppointmentRequest} from "@/lib/hooks/appointment-request/useCancelAppointmentRequest";

export default function AppointmentsPage() {
    const { data: session } = useSession() as { data: CustomSession };
    const { data, isLoading, isError, error, refetch } = useFindAllAppointmentRequestById(session?.user.id);
    const { mutateAsync: cancelAppointment } = useCancelAppointmentRequest();
    const [statusFilter, setStatusFilter] = useState<AppointmentRequestFilterBadgeProps['status']>()
    const [sortFilter, setSortFilter] = useState<AppointmentRequestFilterBadgeProps['sort']>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data: filteredData, totalPages } =
        useClientFilter<AppointmentRequest, AppointmentRequestFilterBadgeProps['status']>({
            data: data || [],
            filterField: "status",
            allValue: "ALL",
            filtersType: statusFilter,
            sortField: "created_at",
            sortOrder: sortFilter,
            pagination: { page: currentPage, pageSize: 12 },
        });
    
    if (isLoading) {
        return (
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
        );
    }
    
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
                Lỗi tải dữ liệu: {error.message}
            </div>
        )
    }
    
    if (data && data.length === 0) {
        return (
            <div className="flex flex-col w-full h-screen items-center justify-center text-gray-500">
                <CalendarX2 className="h-12 w-12 mb-3 text-gray-400" />
                <p className="text-lg font-medium">Không có lịch hẹn nào</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 px-4 sm:px-6 lg:px-8">
            {/* Filter Badge */}
            <div className="flex justify-between p-4 ">
                <AppointmentRequestFilterBadge
                    status={statusFilter}
                    sort={sortFilter}
                    page={currentPage}
                    totalPages={totalPages}
                    onStatusChange={setStatusFilter}
                    onSortChange={setSortFilter}
                    onPageChange={setCurrentPage}
                />
            
            </div>
            
            {/* Appointment Request Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredData.map((appointment) => (
                    <AppointmentRequestCard
                        key={appointment.id}
                        appointment={appointment}
                        onCancel={(id) => cancelAppointment(id).then(() => refetch())}
                    />
                ))}
            </div>
        </div>
    )
}
