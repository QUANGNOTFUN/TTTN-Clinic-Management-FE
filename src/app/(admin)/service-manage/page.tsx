'use client'

import {useFindAllClinicServices} from "@/lib/hooks/clinic-services/useFindAllClinicServices";
import {AdminManagerTable} from "@/app/(admin)/_components/organisms/adminManagerTable/AdminManagerTable";
import React, {useState} from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Loader, MoreHorizontal} from "lucide-react";
import {ClinicService} from "@/types/clinic-service";
import {
	CreateClinicServiceForm
} from "@/app/(admin)/service-manage/_component/createClinicServiceForm/createClinicServiceForm";
import {useCreateClinicService} from "@/lib/hooks/clinic-services/useCreateClinicService";
import {
	UpdateClinicServiceDto,
	UpdateClinicServiceForm
} from "@/app/(admin)/service-manage/_component/updateClinicServiceForm/UpdateClinicServiceForm";
import {useUpdateClinicService} from "@/lib/hooks/clinic-services/useUpdateClinicService";
import {
	DeleteClinicServiceDialog
} from "@/app/(admin)/service-manage/_component/deleteClinicServiceDialog/DeleteClinicServiceDialog";
import {useDeleteClinicService} from "@/lib/hooks/clinic-services/useDeleteClinicService";
import {UpdateImageForm} from "@/app/(admin)/service-manage/_component/updateImageForm/UpdateImageForm";
import Image from "next/image";
import {GET_IMAGE_API} from "@/lib/api/image";

export default function ServiceManagePage () {
	const { data: services = [], refetch } = useFindAllClinicServices();
	const { mutateAsync: create, isPending: createLoading } = useCreateClinicService();
	const { mutateAsync: update, isPending: updateLoading } = useUpdateClinicService();
	const { mutateAsync: deleteDoctor, isPending: deleteLoading } = useDeleteClinicService();
	const [ isActionOpen, setIsActionOpen ] = useState<string>();
	const [ selectedServiceId, setSelectedServiceId ] = useState<string>();
	
	const handleAction = (serviceId: string, action: string) => {
		if (action === "edit") {
			setSelectedServiceId(serviceId);
			setIsActionOpen(action);
		} else if (action === "delete") {
			setSelectedServiceId(serviceId);
			setIsActionOpen(action);
		} else if (action === "upload-image") {
			setIsActionOpen(action);
			setSelectedServiceId(serviceId);
		}
	};
	
	const columns: ColumnDef<ClinicService>[] = [
		{ id: "index", header: "STT", cell: (info) => info.row.index + 1, },
		{ accessorKey: "id", header: "ID", },
		{
			accessorKey: 'image_url', header: 'Ảnh',
			cell: ({ row }) => {
				const imageUrl = row.original.image_url
					? `${GET_IMAGE_API(row.original.image_url)}`
					: 'https://placehold.co/600x400';
				return (
					<div className="flex items-center justify-center">
						<Image
							src={imageUrl}
							alt="Service Preview"
							width={100}
							height={100}
							className="object-cover rounded-lg"
							onError={() => 'https://placehold.co/600x400'}
						/>
					</div>
				);
			}
		},
		{ accessorKey: "name", header: "Tên dịch vụ", },
		{ accessorKey: "description", header: "Mô tả", },
		{ accessorKey: "price", header: "Mức giá", },
		{ accessorKey: "duration_minutes", header: "Thời gian thực hiện", },
		{
			accessorKey: "requires_doctor", header: "Có thể đặt bác sĩ",
			cell: ({ row }) => (
				<div className="">
					{row.original?.requires_doctor === true ? "Có" : "Không"}
				</div>
			),
		},
		{
			accessorKey: "is_active", header: "Trạng thái",
			cell: ({ row }) => (
				<Badge variant="outline" className="capitalize">
					{row.original?.is_active === true ? "Active" : "Inactive"}
				</Badge>
			),
		},
		{ accessorKey: "created_at", header: "Ngày tạo", },
		{ accessorKey: "updated_at", header: "Cập nhật", },
		{
			id: "actions",
			header: "Hành động",
			cell: (info) => (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className={"cursor-pointer"} onClick={() => handleAction(String(info.row.original.id), "upload-image")}>
							Cập nhật ảnh
						</DropdownMenuItem>
						<DropdownMenuItem className={"cursor-pointer"} onClick={() => handleAction(String(info.row.original.id), "edit")}>
							Sửa
						</DropdownMenuItem>
						<DropdownMenuItem className={"cursor-pointer"} onClick={() => handleAction(String(info.row.original.id), "delete")}>
							Xóa
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			),
		},
	];
	
	if (isActionOpen === "edit") {
		const foundService = services.find((s) => s.id === selectedServiceId);
		const payload: UpdateClinicServiceDto = foundService && {
			name: foundService?.name,
			description: foundService?.description,
			price: foundService?.price,
			duration_minutes: foundService?.duration_minutes,
			requires_doctor: foundService?.requires_doctor,
			is_active: foundService?.is_active,
		};
		
		return (
			<UpdateClinicServiceForm
				service={payload}
				onSubmitUpdate={(data) =>
					update({ id: selectedServiceId, payload: data }).then(() => {
						setSelectedServiceId(null);
						setIsActionOpen(null);
					}).finally(() => refetch())
				}
				onClose={() => {
					setSelectedServiceId(null);
					setIsActionOpen(null);
				}}
			/>
		);
	} else if (isActionOpen === "delete") {
		const foundService = services.find((s) => s.id === selectedServiceId);
		return (
			<DeleteClinicServiceDialog
				service={foundService}
				onAction={(id) =>
					deleteDoctor(id).then(() => {
						setSelectedServiceId(null);
						setIsActionOpen(null);
					}).finally(() => refetch())
				}
				onClose={() => {
					setSelectedServiceId(null);
					setIsActionOpen(null);
				}}
			/>
		)
	} else if (isActionOpen === "upload-image") {
		const foundService = services.find((s) => s.id === selectedServiceId);
		return (
			<UpdateImageForm
				service={foundService}
				onClose={() => {
					setSelectedServiceId(null);
					setIsActionOpen(null);
					refetch().then();
				}}
			/>
		);
	}
	
	if (createLoading || updateLoading || deleteLoading) return <Loader className={"animate-spin"}/>;
	
	return (
		<div className="p-6 space-y-6 bg-gradient-to-b from-slate-50 to-gray-100">
			{/* Header với background đẹp */}
			<div className="relative overflow-hidden">
				<div className="relative flex items-center justify-between space-x-4 z-10">
					{/* Title Page */}
					<h1 className="text-3xl font-extrabold text-zinc-700 tracking-tight drop-shadow-md">
						Danh sách dịch vụ
					</h1>
					{/* Add Clinic Service Button */}
					<div className="flex items-center">
						<CreateClinicServiceForm
							onCreateClinicService={(data) => create(data).then(() => refetch())}
						/>
					</div>
				</div>
			</div>
			
			{/* Table hiển thị danh sách bác sĩ */}
			<div className="bg-white rounded-xl shadow-lg p-6">
				<AdminManagerTable<ClinicService>
					data={services}
					columns={columns}
					searchField="name"
					pageSize={10}
				/>
			</div>
		</div>
	);
}