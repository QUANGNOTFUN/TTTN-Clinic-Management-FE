"use client";

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays, subDays } from "date-fns";
import { useCallback, useMemo } from "react";

interface AdminAppointmentDatePickerProps {
	selectedDate: Date;
	onDateChange: (date: Date) => void;
}

export function AdminAppointmentDatePicker(props: AdminAppointmentDatePickerProps) {
	const { selectedDate, onDateChange } = props;
	const formattedDate = useMemo(() => format(selectedDate, "dd/MM/yyyy"), [selectedDate]);
	
	// Memoize callbacks to avoid re-creation
	const handlePreviousDay = useCallback(() => {
		onDateChange(subDays(selectedDate, 1));
	}, [selectedDate, onDateChange]);
	
	const handleNextDay = useCallback(() => {
		onDateChange(addDays(selectedDate, 1));
	}, [selectedDate, onDateChange]);
	
	return (
		<div className="flex items-center gap-2">
			<Button
				variant="outline"
				size="icon"
				onClick={handlePreviousDay}
				className="bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 w-8 h-8 rounded-full shadow-sm cursor-pointer transition-all duration-200"
			>
				<ChevronLeft className="h-5 w-5" />
			</Button>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-[200px] justify-start text-left font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50",
							!selectedDate && "text-gray-400",
							"rounded-lg transition-all duration-200 border-gray-200 cursor-pointer"
						)}
					>
						<CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
						<span className="text-base">{formattedDate}</span>
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
			<Button
				variant="outline"
				size="icon"
				onClick={handleNextDay}
				className="bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 w-8 h-8 shadow-sm rounded-full cursor-pointer transition-all duration-200"
			>
				<ChevronRight className="h-5 w-5" />
			</Button>
		</div>
	);
}