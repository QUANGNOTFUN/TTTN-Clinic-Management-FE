"use client";

import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {AdminManagerTable} from "@/app/(admin)/_components/organisms/adminManagerTable/adminManagerTable";
import {ColumnDef} from "@tanstack/react-table";
import {useFindAllDoctors} from "@/lib/hooks/doctors/useFindAllDoctors";
import {Doctor} from "@/types/doctor";
import {VscLoading} from "react-icons/vsc";
import React from "react";
import {useCreateDoctor} from "@/lib/hooks/doctors/useCreateDoctor";
import {CreateDoctorForm} from "@/app/(admin)/doctor-manage/_components/createDoctorForm/createDoctorForm";

export default function DoctorManagePage() {
	const { data: doctors = [], isLoading, isError, refetch } = useFindAllDoctors();
	const { mutateAsync: create, isPending } = useCreateDoctor();
	
	const handleAction = (patientId: string, action: string) => {
		console.log("Action", action, "on patient", patientId);
	};
	
	const columns: ColumnDef<Doctor>[] = [
		{
			id: "index", header: "STT", cell: (info) => info.row.index + 1,
		},
		{
			accessorKey: "full_name", header: "Tên",
		},
		{
			accessorFn: (row: Doctor) => row.user?.email ?? "-", id: "email", header: "Email",
		},
		{
			accessorKey: "gender", header: "Giới tính",
		},
		{
			accessorKey: "phone_number", header: "SĐT",
		},
		{
			accessorKey: "specialty", header: "Chuyên khoa",
		},
		{
			accessorKey: "rating", header: "Đánh giá",
		},
		{
			accessorKey: "bio", header: "Giới thiệu",
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
	if (isPending) {
		return(
			<div className="min-h-screen flex items-center justify-center bg-zinc-300 bg-opacity-50">
				<VscLoading className="animate-spin text-black text-[50px]" />
			</div>
		);
	}
	if (isError) return <p>Error loading patients.</p>;
	
	return (
		<div className="p-6 space-y-6 bg-gradient-to-b from-slate-50 to-gray-100">
			{/* Header với background đẹp */}
			<div className="relative overflow-hidden">
				<div className="relative flex items-center justify-between space-x-4 z-10">
					{/* Title Page */}
					<h1 className="text-3xl font-extrabold text-zinc-700 tracking-tight drop-shadow-md">
						Danh sách bác sĩ
					</h1>
					{/* Add Doctor Button */}
					<div className="flex items-center">
						<CreateDoctorForm
							onCreateDoctor={(data) => {
								create(data).then(refetch)
							}}
						/>
					</div>
				</div>
			</div>
			
			{/* Table hiển thị danh sách bác sĩ */}
			<div className="bg-white rounded-xl shadow-lg p-6">
				<AdminManagerTable<Doctor>
					data={doctors}
					columns={columns}
					searchField="full_name"
					pageSize={10}
				/>
			</div>
		</div>
	);
}