"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {StepBackIcon, StepForwardIcon} from "lucide-react";
import {stepWeekDates} from "@/libs/function/stepWeekDates";

export type ScheduleDatePickerProps = {
	currentDate: Date;
	onSelected: (date: Date) => void;
}

export function ScheduleDatePicker(
	props : ScheduleDatePickerProps,
) {
	const { currentDate, onSelected } = props
	
	const handleDateChange = (date: Date) => {
		if (onSelected) onSelected(date)
	};
	
	const handleStartDateChange = (date: Date, step: string) => {
		if (onSelected) onSelected(stepWeekDates(date, step));
	}
	
	return (
		<div className="flex items-center justify-between gap-1 text-xs sm:text-sm md:text-base">
			<button
				onClick={() => handleStartDateChange(currentDate, "prev")}
				className={"p-1.5 rounded-md shadow-sm cursor-pointer border border-zinc-400 bg-zinc-100 hover:bg-violet-200 dark:bg-gray-800 dark:hover:bg-gray-600"}
			>
				<StepBackIcon className={"w-4 h-4 sm:w-5 sm:h-5"} />
			</button>
			<DatePicker
				selected={currentDate}
				onChange={handleDateChange}
				dateFormat={"dd-MM-yyyy"}
				className={"border border-zinc-400 py-1 rounded-md shadow-sm hover:ring-1 focus:outline-none focus:ring-1 focus:ring-zinc-500 " +
					"bg-gray-50 dark:bg-gray-800 dark:text-white text-center"}
			/>
			<button
				onClick={() => handleStartDateChange(currentDate, "next")}
				className={"p-1.5 rounded-md shadow-sm cursor-pointer border border-zinc-400 bg-zinc-100 hover:bg-violet-200 dark:bg-gray-800 dark:hover:bg-gray-600"}
			>
				<StepForwardIcon className={"w-4 h-4 sm:w-5 sm:h-5"} />
			</button>
		</div>
	);
}