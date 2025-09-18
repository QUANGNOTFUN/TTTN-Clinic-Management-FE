import {getWeekDates} from "@/lib/function/getWeekDates";
import {useState} from "react";
import {addWeeks, format, subWeeks} from "date-fns";
import {Calendar as CalendarIcon, ChevronLeft, ChevronRight, PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Doctor} from "@/types/doctor";
import {CreateDoctorScheduleDto, DoctorSchedule, Shift} from "@/types/doctor-schedule";
import {vi} from 'date-fns/locale';
import {CreateScheduleForm} from "@/app/(admin)/schedule-manage/_components/createScheduleForm/CreateScheduleForm";

interface AdminScheduleTableProps {
  doctors: Doctor[];
  schedules: DoctorSchedule[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onAddSchedule: (payload: CreateDoctorScheduleDto) => void;
  onRemoveSchedule: (scheduleId: string) => void;
}

const shifts = [
  { id: "MORNING", label: "Sáng (8:00 - 12:00)" },
  { id: "AFTERNOON", label: "Chiều (13:00 - 17:00)" },
  { id: "EVENING", label: "Tối (18:00 - 21:00)" },
];

export function AdminScheduleTable(props: AdminScheduleTableProps) {
  const { doctors, schedules, selectedDate, onDateChange, onAddSchedule, onRemoveSchedule } = props;
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const weekDates = getWeekDates(selectedDate);
  const weekRange = `${format(weekDates[0], 'dd/MM/yyyy')} - ${format(weekDates[6], 'dd/MM/yyyy')}`;
  // Init creates a schedule form
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedDateCreate, setSelectedDateCreate] = useState<Date>(selectedDate);
  const [selectedShiftCreate, setSelectedShiftCreate] = useState<Shift>();
  
  // Handle button calender
  const handlePreviousWeek = () => onDateChange(subWeeks(selectedDate, 1));
  const handleNextWeek = () => onDateChange(addWeeks(selectedDate, 1));
  
  const scheduleMap = schedules?.reduce((acc, schedule) => {
    const scheduleDate = new Date(schedule.date);
    const formattedDate = format(scheduleDate, 'yyyy-MM-dd');
    const key = `${schedule.shift}-${formattedDate}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(schedule);
    return acc;
  }, {} as Record<string, DoctorSchedule[]>);
  
  const columns = [
    {
      accessorKey: "shift",
      header: () => <div className="text-lg font-semibold text-gray-800">Ca làm việc</div>,
      cell: ({ row }) => {
        const shift = shifts.find((s) => s.id === row.original.shift);
        return (
            <div className="font-medium text-gray-700 text-base">{shift?.label}</div>
        );
      },
    },
    ...weekDates.map((date) => ({
      id: format(date, 'yyyy-MM-dd'),
      header: () => (
          <div className="text-center">
            <div className="font-semibold text-gray-800">
              {format(date, 'EEEE', { locale: vi })}
            </div>
            <div className="text-sm text-gray-500">
              {format(date, 'dd/MM/yyyy')}
            </div>
          </div>
      ),
      cell: ({ row }) => {
        const shift = row.original.shift;
        const dateKey = format(date, 'yyyy-MM-dd');
        const key = `${shift}-${dateKey}`;
        const currentSchedules = scheduleMap[key] || [];
        
        return (
            <div className="min-h-[120px] p-3 bg-gray-50 rounded-lg shadow-sm transition-all duration-200 hover:bg-gray-100">
              <div className="flex justify-end gap-2 mb-3">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedShiftCreate(shift as Shift);
                      setSelectedDateCreate(date);
                      setIsCreating(true);
                    }}
                    className={cn(
                        "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500",
                        "transition-all duration-200 font-medium rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                    )}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {currentSchedules.map((schedule) => (
                    <div
                        key={schedule.id}
                        className="flex items-center justify-between p-2 text-sm bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                  <span className="truncate font-medium text-gray-700">
                    {doctors.find((d) => d.user_id === schedule.doctor_id)?.full_name}
                  </span>
                      <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveSchedule(schedule.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </Button>
                    </div>
                ))}
              </div>
            </div>
        );
      },
    })),
  ];
  
  const data = shifts.map((shift) => ({
    shift: shift.id as Shift,
  }));
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  
  if (isCreating) {
    return (
        <CreateScheduleForm
            doctors={doctors}
            defaultDate={selectedDateCreate.toISOString()}
            defaultShift={selectedShiftCreate}
            onCreateSchedule={onAddSchedule}
        />
    );
  }
  
  return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Date Selection */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  className={cn(
                      "w-[280px] justify-start text-left font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50",
                      !selectedDate && "text-gray-400",
                      "rounded-lg transition-all duration-200 border-gray-200"
                  )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-base">{weekRange}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white rounded-lg shadow-xl">
              <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && onDateChange(date)}
                  className="bg-white rounded-lg"
              />
            </PopoverContent>
          </Popover>
          
          {/* Week Navigation */}
          <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousWeek}
                className="bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full w-10 h-10 shadow-sm transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={handleNextWeek}
                className="bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full w-10 h-10 shadow-sm transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Doctor Selection */}
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-[220px] bg-white text-gray-700 font-medium rounded-lg shadow-sm border-gray-200 hover:bg-gray-50 transition-all duration-200">
              <SelectValue placeholder="Chọn bác sĩ" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {doctors.map((doctor) => (
                  <SelectItem
                      key={doctor.user_id}
                      value={doctor.user_id}
                      className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                  >
                    {doctor?.full_name || "Chưa cập nhật tên"}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Schedule Table */}
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