"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface AdminAppointmentServiceSelectProps {
	services: { id: string; name: string }[];
	onSelectedServiceChange: (serviceId: string) => void;
	initialSelectedService?: string;
}

export function AdminAppointmentServiceSelect(props: AdminAppointmentServiceSelectProps) {
	const { services, onSelectedServiceChange, initialSelectedService } = props;
	
	const [selectedService, setSelectedService] = useState("");
	
	// Sync with initialSelectedService when it changes
	useEffect(() => {
		if (initialSelectedService) {
			setSelectedService(initialSelectedService);
		} else if (services.length > 0 && !selectedService) {
			setSelectedService(services[0].id); // Set default only if no selection
			onSelectedServiceChange(services[0].id);
		}
	}, [initialSelectedService, services]);
	
	const handleValueChange = (value: string) => {
		setSelectedService(value);
		onSelectedServiceChange(value);
	};
	
	return (
		<div className="flex items-center gap-2">
			<Select value={selectedService} onValueChange={handleValueChange}>
				<SelectTrigger className="w-[220px] bg-white text-gray-700 font-medium rounded-lg shadow-sm border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200">
					<SelectValue placeholder="Chọn dịch vụ để lọc" />
				</SelectTrigger>
				<SelectContent>
					{(services ?? []).map((service) => (
						<SelectItem key={service.id} value={service.id}>
							{service.name || "Chưa cập nhật tên dịch vụ"}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}