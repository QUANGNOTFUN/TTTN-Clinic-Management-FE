"use client";

import { getWeekDates } from "@/lib/function/getWeekDates";
import { useCallback, useMemo, useState } from "react";
import { addWeeks, format, subWeeks } from "date-fns";
import { PlusIcon, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Doctor } from "@/types/doctor";
import { vi } from "date-fns/locale";
import { CreateDoctorScheduleDto } from "@/app/(admin)/schedule-manage/_components/createScheduleForm/CreateScheduleForm";
import { DoctorSchedule, Shift } from "@/types/doctor-schedule";
import {
    AdminScheduleDoctorSelect,
} from "@/app/(admin)/schedule-manage/_components/adminSchedulesTable/AdminScheduleDoctorSelect";
import {
    AdminScheduleTableWeekNavigation,
} from "@/app/(admin)/schedule-manage/_components/adminSchedulesTable/AdminScheduleTableWeekNavigation";

interface AdminScheduleTableProps {
    doctors: Doctor[];
    schedules: DoctorSchedule[];
    selectedDate: Date;
    onSelectedDoctor: (doctorId: string) => void;
    onDateChange: (date: Date) => void;
    onAddSchedule: (payload: CreateDoctorScheduleDto) => void;
    onRemoveSchedule: (scheduleId: string) => void;
}

const shifts = [
    { id: "MORNING", label: "Sáng (7:30 - 11:30)" },
    { id: "AFTERNOON", label: "Chiều (13:30 - 17:00)" },
    { id: "OVERTIME", label: "Ngoài giờ (17:00 - 18:00)" },
];

export function AdminScheduleTable(props: AdminScheduleTableProps) {
    const { doctors, schedules, selectedDate, onSelectedDoctor, onDateChange, onAddSchedule, onRemoveSchedule } = props;
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");
    
    // Get current date for comparison
    const currentDate = useMemo(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }, []);
    
    // Memoize weekDates to avoid recomputation on every render
    const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);
    const weekRange = `${format(weekDates[0], "dd/MM/yyyy")} - ${format(weekDates[6], "dd/MM/yyyy")}`;
    
    // Memoize scheduleMap to avoid recomputation with large schedules
    const scheduleMap = useMemo(() => {
        if (!schedules) return {};
        return schedules.reduce((acc, schedule) => {
            const scheduleDate = new Date(schedule.date);
            if (isNaN(scheduleDate.getTime())) return acc; // Skip invalid dates
            const formattedDate = format(scheduleDate, "yyyy-MM-dd");
            const key = `${schedule.shift}-${formattedDate}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(schedule);
            return acc;
        }, {} as Record<string, DoctorSchedule[]>);
    }, [schedules]);
    
    // Memoize columns to prevent re-creation
    const columns = useMemo(
        () => [
            {
                accessorKey: "shift",
                header: () => <div className="text-lg font-semibold text-gray-800">Ca làm việc</div>,
                cell: ({ row }) => {
                    const shift = shifts.find((s) => s.id === row.original.shift);
                    return <div className="font-medium text-gray-700 text-md">{shift?.label}</div>;
                },
            },
            ...weekDates.map((date) => {
                const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Normalize date
                const isFutureDate = normalizedDate <= currentDate;
                return {
                    id: format(date, "yyyy-MM-dd"),
                    header: () => (
                        <div className="text-center">
                            <div className="font-semibold text-gray-800">
                                {format(date, "EEEE", { locale: vi })}
                            </div>
                            <div className="text-sm text-gray-500">{format(date, "dd/MM/yyyy")}</div>
                        </div>
                    ),
                    cell: ({ row }) => {
                        const shift = row.original.shift;
                        const dateKey = format(date, "yyyy-MM-dd");
                        const key = `${shift}-${dateKey}`;
                        const currentSchedules = scheduleMap[key] || [];
                        
                        return (
                            <div className="relative min-h-[120px] p-3 bg-gray-50 rounded-sm shadow-sm transition-all duration-200 hover:bg-gray-100">
                                {/* Add Schedule Button - Always visible, disabled for future dates */}
                                <div className="flex justify-end mb-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            onAddSchedule({
                                                doctor_id: selectedDoctor,
                                                date: date.toISOString(),
                                                shift: shift as Shift,
                                                consecutiveWeeks: 0,
                                            })
                                        }
                                        className={cn(
                                            "bg-sky-300 text-white hover:bg-sky-600 disabled:bg-gray-300 disabled:text-gray-50",
                                            "transition-all duration-200 font-medium rounded w-6 h-6 flex items-center justify-center cursor-pointer"
                                        )}
                                        disabled={isFutureDate}
                                    >
                                        <PlusIcon />
                                    </Button>
                                </div>
                                {/* CELLS SECTION */}
                                <div className="space-y-2">
                                    {currentSchedules.map((schedule) => (
                                        <div
                                            key={schedule.id}
                                            className="flex items-center justify-between p-2 text-sm bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                          <span className="truncate font-medium text-gray-700">
                                            {doctors.find((d) => d.user_id === schedule.doctor_id)?.full_name ||
                                                "Chưa cập nhật tên"}
                                          </span>
                                            {!isFutureDate && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onRemoveSchedule(schedule.id)}
                                                    className="text-red-500 hover:text-white hover:bg-red-400 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer transition-all duration-200"
                                                >
                                                    <XIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    },
                };
            }),
        ],
        [weekDates, scheduleMap, selectedDoctor, onAddSchedule, doctors, onRemoveSchedule, currentDate]
    );
    
    // Memoize data to prevent re-creation
    const data = useMemo(() => shifts.map((shift) => ({ shift: shift.id as Shift })), []);
    
    // Memoize table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    
    // Memoize callbacks
    const handlePreviousWeek = useCallback(() => onDateChange(subWeeks(selectedDate, 1)), [selectedDate, onDateChange]);
    const handleNextWeek = useCallback(() => onDateChange(addWeeks(selectedDate, 1)), [selectedDate, onDateChange]);
    
    return (
        <div className="space-y-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <div className="flex items-center gap-4 px-3 flex-wrap justify-between">
                {/* Doctor Selection */}
                <AdminScheduleDoctorSelect
                    doctors={doctors}
                    onSelectedDoctorChange={(doctorId) => {
                        setSelectedDoctor(doctorId);
                        onSelectedDoctor(doctorId);
                    }}
                    initialSelectedDoctor={selectedDoctor}
                />
                
                {/* Week Navigation */}
                <AdminScheduleTableWeekNavigation
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                    weekRange={weekRange}
                    handlePreviousWeek={handlePreviousWeek}
                    handleNextWeek={handleNextWeek}
                />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
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
            </div>
        </div>
    );
}