"use client";

import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Loader, MoreHorizontal} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import {useFindAllDoctors} from "@/lib/hooks/doctors/useFindAllDoctors";
import {Doctor, UpdateDoctorDto} from "@/types/doctor";
import React, {useState} from "react";
import {useCreateDoctor} from "@/lib/hooks/doctors/useCreateDoctor";
import {CreateDoctorForm} from "@/app/(admin)/doctor-manage/_components/createDoctorForm/createDoctorForm";
import {useUpdateDoctor} from "@/lib/hooks/doctors/useUpdateDoctor";
import {UpdateDoctorForm} from "@/app/(admin)/doctor-manage/_components/updateDoctorForm/updateDoctorForm";
import {DeleteDoctorDialog} from "@/app/(admin)/doctor-manage/_components/deleteDoctorDialog/DeleteDoctorDialog";
import {useDeleteDoctor} from "@/lib/hooks/doctors/userDeleteDoctor";
import {AdminManagerTable} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminManagerTable";

export default function DoctorManagePage() {
	const { data: doctors = [], refetch } = useFindAllDoctors();
	const { mutateAsync: create, isPending: createLoading } = useCreateDoctor();
	const { mutateAsync: update, isPending: updateLoading } = useUpdateDoctor();
	const { mutateAsync: deleteDoctor, isPending: deleteLoading } = useDeleteDoctor();
	const [ isActionOpen, setIsActionOpen ] = useState<string>();
	const [ selectedDoctorId, setSelectedDoctorId ] = useState<string>();
	
	const handleAction = (patientId: string, action: string) => {
		if (action === "edit") {
			setSelectedDoctorId(patientId);
			setIsActionOpen(action);
		} else if (action === "delete") {
			setSelectedDoctorId(patientId);
			setIsActionOpen(action);
		}
	};
	
	const columns: ColumnDef<Doctor>[] = [
		{ id: "index", header: "STT", cell: (info) => info.row.index + 1, },
		{ accessorKey: "full_name", header: "Tên", },
		{ accessorFn: (row: Doctor) => row.user?.email ?? "-", id: "email", header: "Email", },
		{ accessorKey: "gender", header: "Giới tính", },
		{ accessorKey: "phone_number", header: "SĐT", },
		{ accessorKey: "specialty", header: "Chuyên khoa", },
		{ accessorKey: "rating", header: "Đánh giá", },
		{ accessorKey: "bio", header: "Giới thiệu", },
		{ accessorKey: "created_at", header: "Ngày tạo", },
		{ accessorKey: "updated_at", header: "Cập nhật", },
		{
			accessorKey: "is_active", header: "Trạng thái",
			cell: ({ row }) => (
				<Badge variant="outline" className="capitalize">
					{row.original.user.is_active === true ? "Active" : "Inactive"}
				</Badge>
			),
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
	
	if (isActionOpen === "edit") {
		const foundDoctor = doctors.find((doctor) => doctor.user_id === selectedDoctorId);
		const payload: UpdateDoctorDto = foundDoctor && {
			full_name: foundDoctor.full_name,
			gender: foundDoctor.gender,
			phone_number: foundDoctor.phone_number,
			specialty: foundDoctor.specialty,
			bio: foundDoctor.bio,
		};
		
		return (
			<UpdateDoctorForm
				doctor={payload}
				onSubmitUpdate={(data) =>
					update({ id: selectedDoctorId, payload: data }).then(() => {
						setSelectedDoctorId(null);
						setIsActionOpen(null);
					}).finally(() => refetch())
				}
				onClose={() => {
					setSelectedDoctorId(null);
					setIsActionOpen(null);
				}}
			/>
		);
	} else if (isActionOpen === "delete") {
		const foundDoctor = doctors.find((doctor) => doctor.user_id === selectedDoctorId);
		return (
			<DeleteDoctorDialog
				doctor={foundDoctor}
				onAction={(id) =>
					deleteDoctor(id).then(() => {
						setSelectedDoctorId(null);
						setIsActionOpen(null);
					}).finally(() => refetch())
				}
				onClose={() => {
					setSelectedDoctorId(null);
					setIsActionOpen(null);
				}}
			/>
		)
	}
	
	if (createLoading || updateLoading || deleteLoading) return <Loader/>;
	
	
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