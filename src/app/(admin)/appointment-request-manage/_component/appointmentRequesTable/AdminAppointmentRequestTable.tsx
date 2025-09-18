"use client";

import { useMemo, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { AppointmentRequest } from "@/types/appointment-request";
import { format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import {
	AdminAppointmentServiceSelect,
} from "@/app/(admin)/appointment-request-manage/_component/appointmentRequesTable/AdminAppointmentServiceSelect";
import {
	AdminAppointmentDatePicker,
} from "@/app/(admin)/appointment-request-manage/_component/appointmentRequesTable/AdminAppointmentDatePicker";
import { ClinicService } from "@/types/clinic-service";

interface AdminAppointmentRequestTableProps {
	appointmentRequests: AppointmentRequest[] | undefined;
	services: ClinicService[];
	selectedDate: Date;
	onDateChange: (date: Date) => void;
	onSelectedServiceChange: (serviceId: string) => void;
	onApprove: (id: string) => void;
	onReject: (id: string) => void;
	onEdit: (id: string) => void;
}

export function AdminAppointmentRequestTable(props: AdminAppointmentRequestTableProps) {
	const {
		appointmentRequests,
		services,
		selectedDate,
		onDateChange,
		onSelectedServiceChange,
		onApprove,
		onReject,
		onEdit,
	} = props;
	const [selectedService, setSelectedService] = useState<string>("");
	
	// Sync initial selected service when services change
	useEffect(() => {
		if (services.length > 0 && !selectedService) {
			setSelectedService(services[0].id); // Set default if no selection
			onSelectedServiceChange(services[0].id); // Notify parent
		}
	}, [services]);
	
	// Filter appointments based on selected service and date, default to empty array if undefined
	const filteredAppointments = useMemo(() => {
		return (appointmentRequests ?? []).filter((req) => {
			const matchesService = !selectedService || req.service_id === selectedService;
			const matchesDate = isSameDay(new Date(req.appointment_time), selectedDate);
			return matchesService && matchesDate;
		});
	}, [appointmentRequests, selectedService, selectedDate]);
	
	// Define columns
	const columns = useMemo(
		() => [
			{ accessorKey: "full_name", header: "Họ và tên" },
			{ accessorKey: "phone_number", header: "Số điện thoại" },
			{
				accessorKey: "appointment_time",
				header: "Thời gian đặt",
				cell: ({ getValue }) => format(new Date(getValue() as string), "dd/MM/yyyy HH:mm", { locale: vi }),
			},
			{ accessorKey: "status", header: "Trạng thái" },
			{
				accessorKey: "actions",
				header: "Hành động",
				cell: ({ row }) => {
					const request = row.original as AppointmentRequest;
					return (
						<select
							className="border rounded p-1 text-sm"
							onChange={(e) => {
								const action = e.target.value;
								if (action === "approve") onApprove(request.id);
								else if (action === "reject") onReject(request.id);
								else if (action === "edit") onEdit(request.id);
								e.target.value = ""; // Reset dropdown
							}}
							value=""
						>
							<option value="" disabled>
								Chọn hành động
							</option>
							<option value="approve">Phê duyệt</option>
							<option value="reject">Từ chối</option>
							<option value="edit">Sửa</option>
						</select>
					);
				},
			},
		],
		[onApprove, onReject, onEdit]
	);
	
	const table = useReactTable({
		data: filteredAppointments,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	
	return (
		<div className="space-y-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
			<div className="flex items-center gap-4 px-3 flex-wrap justify-between">
				<AdminAppointmentServiceSelect
					services={services}
					onSelectedServiceChange={(serviceId) => {
						setSelectedService(serviceId);
						onSelectedServiceChange(serviceId);
					}}
					initialSelectedService={selectedService} // Pass current state
				/>
				<AdminAppointmentDatePicker
					selectedDate={selectedDate}
					onDateChange={onDateChange}
				/>
			</div>
			<div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
				{filteredAppointments.length === 0 ? (
					<div className="text-center py-4 text-gray-500">Không có yêu cầu đặt lịch</div>
				) : (
					<Table className="w-full table-auto [&_td]:border [&_th]:border border-collapse text-center">
						<TableHeader className="bg-blue-50">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className="hover:bg-blue-100 transition-all duration-200">
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="text-center text-gray-800 font-semibold text-base py-4"
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									className="hover:bg-gray-50 transition-all duration-200"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="py-3">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
}