"use client";

import {Doctor} from "@/types/doctor";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {XIcon} from "lucide-react";

interface AdminScheduleDoctorSelectProps {
	doctors: Doctor[];
	onSelectedDoctorChange: (doctor: string) => void;
	initialSelectedDoctor?: string;
}

export function AdminScheduleDoctorSelect(props: AdminScheduleDoctorSelectProps) {
	const { doctors, onSelectedDoctorChange, initialSelectedDoctor } = props;
	
	// ✅ defaultValue nên để "" nếu chưa có doctor ban đầu
	const [selectedDoctor, setSelectedDoctor] = useState(initialSelectedDoctor ?? "");
	
	const handleValueChange = (value: string) => {
		setSelectedDoctor(value);
		onSelectedDoctorChange(value);
	};
	
	return (
		<div className="flex items-center gap-2">
			<Select value={selectedDoctor} onValueChange={handleValueChange}>
				<SelectTrigger className="w-[220px] bg-white text-gray-700 font-medium rounded-lg shadow-sm border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200 flex items-center justify-between">
					<SelectValue placeholder="Chọn bác sĩ để lọc" />
				</SelectTrigger>
				<SelectContent>
					{doctors.map((doctor) => (
						<SelectItem key={doctor.user_id} value={doctor.user_id}>
							{doctor?.full_name || "Chưa cập nhật tên"}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			
			{/* Nút reset */}
			{selectedDoctor && (
				<Button
					onClick={() => handleValueChange("")}
					className="rounded-md bg-zinc-100 hover:bg-zinc-300 text-gray-500 hover:text-gray-800 cursor-pointer transition-all duration-200"
				>
					<XIcon />
				</Button>
			)}
		</div>
	
	);
}
