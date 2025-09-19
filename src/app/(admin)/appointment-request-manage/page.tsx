'use client'

import {
	AdminAppointmentRequestTable
} from "@/app/(admin)/appointment-request-manage/_component/appointmentRequesTable/AdminAppointmentRequestTable";
import {useState} from "react";
import {useFindAllClinicServices} from "@/lib/hooks/clinic-services/useFindAllClinicServices";
import {useFindAllAppointmentRequestByDate} from "@/lib/hooks/appointment-request/useFindAllAppointmentRequestByDate";
import {VscLoading} from "react-icons/vsc";

export default function AppointmentRequestManagePage() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const {
		data: services = [],
		isLoading: serviceLoading,
		isFetching: serviceFetching,
	} = useFindAllClinicServices();
	// const [selectedService, setSelectedService] = useState<string>("");
	const {
		data: appointmentsByDate = [],
		isLoading: appointmentLoading,
		isFetching: appointmentFetching,
		refetch: refreshAppointmentsByDate,
	} = useFindAllAppointmentRequestByDate(selectedDate);
	
	const handleDateChange = async (date: Date) => {
		setSelectedDate(date)
		await refreshAppointmentsByDate();
	};
	const handleApprove = (id: string) => console.log("Approved:", id);
	const handleReject = (id: string) => console.log("Rejected:", id);
	const handleEdit = (id: string) => console.log("Edit:", id);
	
	const isAnyLoading =
		serviceLoading || serviceFetching ||
		appointmentLoading || appointmentFetching ;
	
	if (isAnyLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-zinc-300 bg-opacity-50">
				<VscLoading className="animate-spin text-black text-[50px]" />
			</div>
		);
	}
	
	return (
		<>
			<AdminAppointmentRequestTable
				appointmentRequests={ appointmentsByDate }
				services={ services }
				selectedDate={ selectedDate }
				onDateChange={ handleDateChange }
				onApprove={ handleApprove }
				onReject={ handleReject }
				onEdit={ handleEdit }
			/>
		</>
	);
}