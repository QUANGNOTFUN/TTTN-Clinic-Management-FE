"use client";

import {useFindAllDoctors} from "@/lib/hooks/doctors/useFindAllDoctors";
import {useFindAllPatients} from "@/lib/hooks/patients/useFindAllPatients";
import {useFindAllClinicServices} from "@/lib/hooks/clinic-services/useFindAllClinicServices";
import {useFindAllAppointmentRequestByDate} from "@/lib/hooks/appointment-request/useFindAllAppointmentRequestByDate";
import {StatsCardsSection} from "@/app/(admin)/admin-dashboard/_component/statsCardsSection/StatsCardsSection";
import {useState} from "react";
import {
    AppointmentRequestSection
} from "@/app/(admin)/admin-dashboard/_component/AppointmentReqSection/AppointmentRequestSection";
import {
    StatsCardsSectionSkeleton
} from "@/app/(admin)/admin-dashboard/_component/statsCardsSection/StatsCardsSectionSkeleton";
import {
    AppointmentRequestSectionSkeleton
} from "@/app/(admin)/admin-dashboard/_component/AppointmentReqSection/AppointmentRequestSectionSkeleton"; // Icons

export default function AdminDashBoardPage() {
    const { data: doctors } = useFindAllDoctors();
    const { data: patients } = useFindAllPatients();
    const { data: services } = useFindAllClinicServices();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { data: appointmentRequest } = useFindAllAppointmentRequestByDate(selectedDate);
    
    if (!doctors || !patients || !services || !appointmentRequest) {
        return(
            <div className={"flex-1 flex flex-col w-full p-6 space-y-8"}>
                <StatsCardsSectionSkeleton />
                <AppointmentRequestSectionSkeleton />
            </div>
        );
    }
    
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex-1 flex flex-col w-full">
                <main className="p-6 space-y-8">
                    <StatsCardsSection doctors={doctors} patients={patients} services={services} appointmentRequest={appointmentRequest} />
                    <AppointmentRequestSection services={services} appointmentRequest={appointmentRequest} />
                </main>
            </div>
        </div>
    );
}