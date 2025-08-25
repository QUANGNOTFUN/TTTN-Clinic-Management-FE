import React, {useState} from "react";
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Maximize2Icon, UserMinus, UserPlus} from "lucide-react";
import {getWeekDates} from "@/libs/function/getWeekDates";
import {ViewDoctorListCard} from "@/app/(admin)/_components/organisms/adminSchedulesTable/ViewDoctorListCard";
import {CreateDoctorScheduleData, DoctorSchedule} from "@/types/doctorSchedule";

export interface AdminSchedulesTableProps {
	selectedDate?: Date;
	onCreateButton: (isOpen: boolean, createData: CreateDoctorScheduleData) => void;
	initialItems?: DoctorSchedule[];
	editSchedule: {
		onDeleteButton?: (id: DoctorSchedule["id"]) => void;
	}
}

type HeaderScheduleTableProps = {
	key: string;
	name: string;
	date?: Date;
	shiftDuration?: { start: string; end: string };
};

type ScheduleItem = {
	shiftKey: string;
	doctors: { [key: string]: DoctorSchedule[] | null };
};

type StatusButton = {
	status: "view" | "delete"
};

export default function AdminSchedulesTable(
	props: AdminSchedulesTableProps
) {
	const { selectedDate, onCreateButton, initialItems, editSchedule } = props;
	const [isStatus, setIsStatus] = useState<StatusButton["status"]>('view');
	const dates = getWeekDates(selectedDate || new Date());
	
	const headers: HeaderScheduleTableProps[] = [
		{ key: "MONDAY", name: "Thứ 2", date: dates[0] },
		{ key: "TUESDAY", name: "Thứ 3", date: dates[1] },
		{ key: "WEDNESDAY", name: "Thứ 4", date: dates[2] },
		{ key: "THURSDAY", name: "Thứ 5", date: dates[3] },
		{ key: "FRIDAY", name: "Thứ 6", date: dates[4] },
		{ key: "SATURDAY", name: "Thứ 7", date: dates[5] },
		{ key: "SUNDAY", name: "Chủ nhật", date: dates[6] },
	];
	const shifts: HeaderScheduleTableProps[] = [
		{ key: "MORNING", name: "Sáng", shiftDuration: { start: "08:00", end: "12:00" } },
		{ key: "AFTERNOON", name: "Chiều", shiftDuration: { start: "13:00", end: "17:00" } },
		{ key: "OVERTIME", name: "Ngoài giờ", shiftDuration: { start: "18:00", end: "22:00" } },
	];
	
	// Khởi tạo state cho dữ liệu bảng
	const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(() => {
		return shifts.map((shift) => ({
			shiftKey: shift.key,
			doctors: headers.reduce((acc, header) => {
				const items = initialItems?.filter(
					(item) => item.shift === shift.key && item.day === header.key
				);
				acc[header.key] = items
					?.filter((item) => item !== null) || [];
				return acc;
			}, {} as { [key: string]: DoctorSchedule[] | null }),
		}));
	});
	// View detail
	const [isViewOpen, setIsViewOpen] = useState(false);
	const [selectedDoctors, setSelectedDoctors] = useState<DoctorSchedule[]>([]);
	const [selectedDateItem, setSelectedDateItem] = useState<string>();
	
	// Định nghĩa các cột
	const columns: ColumnDef<ScheduleItem, unknown>[] = [
		{
			header: "Ca làm",
			accessorKey: "shiftKey",
			cell: (info) => {
				const shift = shifts.find((s) => s.key === info.getValue());
				return (
					<div className="w-full md:min-w-32 flex flex-col items-center">
						<span>{shift?.name}</span>
						<span className="text-gray-600">
              {shift?.shiftDuration?.start} - {shift?.shiftDuration?.end}
            </span>
					</div>
				);
			},
		},
		...headers.map((header) => ({
			header: () => (
				<div className={"flex flex-col items-center"}>
					<span>{header.name}</span>
					<span className={"text-gray-600"}>{header.date.toLocaleDateString()}</span>
				</div>
			),
			accessorKey: header.key,
			cell: (info) => {
				const row = info.row.original;
				const doctors = row.doctors[info.column.id] || [];
				return (
					<div className={"h-full w-full md:min-w-32 flex flex-col"}>
						{/* BUTTON */}
						<div className={"flex justify-center w-full p-1 gap-3 border-b border-gray-300"}>
							{/* ADD BUTTON */}
							<button
                onClick={onCreateButton ? () => handleAddDoctor(
                    header.date.toISOString(),
                    row.shiftKey,
                    header.key as CreateDoctorScheduleData['day']
                ) : undefined}
								className={"p-1.5 bg-zinc-100 hover:bg-green-300 rounded-md shadow-sm cursor-pointer"}
							>
								<UserPlus size={16} />
							</button>
							{/* REMOVE BUTTON */}
							<button
								onClick={() => {
									handleRemoveDoctor(row.shiftKey, header.key)
									setIsStatus('delete')
									setSelectedDateItem(() => header.date.toLocaleDateString())
									setSelectedDoctors(doctors)
									setIsViewOpen(true)
								}}
								className={"p-1.5 bg-zinc-100 hover:bg-red-300 rounded-md shadow-sm cursor-pointer"}
							>
								<UserMinus size={16} />
							</button>
							{/* VIEW DETAIL BUTTON */}
							{doctors.length > 5 && (
								<button
									onClick={() => {
										setSelectedDateItem(() => header.date.toLocaleDateString())
										setSelectedDoctors(doctors)
										setIsViewOpen(true)
									}}
									className={"p-1.5 bg-zinc-100 hover:bg-violet-300 rounded-md shadow-sm cursor-pointer"}
								>
									<Maximize2Icon size={16} />
								</button>
							)}
						</div>
						{/* CARD */}
						<div className={
							(doctors.length > 4 ? "max-h-60 h-full p-1.5 overflow-y-auto " : "")
						}>
							{doctors.length > 0 ? (
								doctors.map((doctor, index) => (
									<div
										key={index}
										className={"w-full p-1 bg-white border border-gray-300 rounded-md shadow-sm mt-2 truncate text-center max-h-24"}
									>
										{doctor.doctor.user.full_name}
									</div>
								))
							) : (
								<div
									className={"w-full p-1 bg-zinc-200/70 border border-gray-300 rounded-md shadow-sm mt-2 text-zinc-500 text-center max-h-24"}>
									{"No Doctor"}
								</div>
							)}
						</div>
						
					</div>
				);
			},
		})),
	];
	
	// Cấu hình bảng
	const table = useReactTable({
		data: scheduleData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	
	// Hàm thêm bác sĩ
	const handleAddDoctor = (
		date: string,
		shiftKey: CreateDoctorScheduleData['shift'],
		dayKey: CreateDoctorScheduleData['day']
	) => {
		const createData: CreateDoctorScheduleData = {
			doctor_id: null,
			shift: shiftKey,
			day: dayKey,
			is_available: true,
			date: date,
			week_count: 0,
		}
		onCreateButton(true, createData);
	};
	
	// Hàm xóa bác sĩ (xóa doctor cuối cùng)
	const handleRemoveDoctor = (shiftKey: string, dayKey: string) => {
		setScheduleData((prev) =>
			prev.map((item) =>
				item.shiftKey === shiftKey
					? {
						...item,
						doctor: {
							...item.doctors[dayKey],
							[dayKey]: item.doctors[dayKey]?.length
								? item.doctors[dayKey].slice(0, -1)
								: null,
						},
					}
					: item
			)
		);
	};
	
	// Hàm xử lý khi đóng ViewDoctorListCard
	const handleCloseView = () => {
		setIsViewOpen(false);
		setSelectedDoctors([]);
	};
	
	return (
		<div className="container mx-auto overflow-auto dark:outline dark:outline-white shadow-lg rounded-xl">
			<table
				className={
					"container table-auto border-collapse min-w-full rounded-lg shadow-md " +
					"text-xs md:text-sm lg:text-base font-medium text-zinc-950 dark:text-gray-200"
				}
			>
				<thead className="bg-violet-300 text-gray-900 dark:bg-gray-900 dark:text-gray-300">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className="border border-violet-200 py-3 px-2 text-center"
							>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
				</thead>
				<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr
						key={row.id}
						className={"bg-white hover:bg-violet-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"}
					>
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								className={"h-24 md:h-28 py-2 px-1 border border-gray-300 text-center text-xs md:text-base"}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
			{isViewOpen && (
				<ViewDoctorListCard
					label={`Danh sách bác sĩ (${selectedDateItem})`}
					schedules={selectedDoctors}
					editSchedule={{
						status: isStatus,
						onDelete: (id) => {
							editSchedule.onDeleteButton(id)
							setIsStatus('view')
						}
					}}
					onClose={handleCloseView}
				/>
			)}
		</div>
	);
}