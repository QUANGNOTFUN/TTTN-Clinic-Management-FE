"use client";

import { useFindAllPatients } from "@/lib/hooks/patients/useFindAllPatients";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Patient } from "@/types/patient"; // Đảm bảo import kiểu Patient
import { AdminManagerTable } from "@/app/(admin)/_components/organisms/adminManagerTable/adminManagerTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export default function PatientManagePage() {
	const { data: patients = [], isLoading, isError } = useFindAllPatients();
	
	const handleAction = (patientId: string, action: string) => {
		console.log("Action", action, "on patient", patientId);
	};
	
	const columns: ColumnDef<Patient>[] = [
		{
			id: "index", header: "STT", cell: (info) => info.row.index + 1,
		},
		{
			accessorKey: "full_name", header: "Tên",
		},
		{
			accessorFn: (row: Patient) => row.user?.email ?? "-", id: "email", header: "Email",
		},
		{
			accessorKey: "gender", header: "Giới tính",
		},
		{
			accessorKey: "date_of_birth", header: "Ngày sinh",
		},
		{
			accessorKey: "medical_history", header: "Tiền sử bệnh",
		},
		{
			accessorKey: "address", header: "Địa chỉ",
		},
		{
			accessorKey: "phone_number", header: "SĐT",
		},
		{
			accessorKey: "blood_type", header: "Nhóm máu",
		},
		{
			accessorKey: "emergency_contact", header: "Người liên hệ khẩn",
		},
		{
			accessorKey: "insurance_number", header: "Số bảo hiểm",
		},
		{
			accessorKey: "created_at", header: "Ngày tạo",
		},
		{
			accessorKey: "updated_at", header: "Cập nhật",
		},
		{
			accessorKey: "user_id", header: "Trạng thái", cell: () => <Badge variant="outline">ACTIVE</Badge>,
		},
		{
			id: "actions",
			header: "Hành động",
			cell: (info) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => handleAction(String(info.row.original.user_id), "edit")}>
							Sửa
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => handleAction(String(info.row.original.user_id), "delete")}>
							Xóa
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
	
	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading patients.</p>;
	
	return (
		<div className="p-6 space-y-6 bg-gradient-to-b from-slate-50 to-gray-100">
			{/* Title Page */}
			<div className="relative flex items-center justify-between space-x-4 z-10">
				<h1 className="text-3xl font-extrabold text-zinc-700 tracking-tight drop-shadow-md">
					Danh sách bệnh nhân
				</h1>
			</div>
			
			<div className="bg-white rounded-xl shadow-lg p-6">
				<AdminManagerTable<Patient>
					data={patients}
					columns={columns}
					searchField="full_name"
					pageSize={10}
				/>
			</div>
		</div>
	);
}