"use client";

import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {format} from "date-fns"; // Thêm date-fns để định dạng ngày
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Doctor} from "@/types/doctor";
import {CreateDoctorScheduleDto, Shift} from "@/types/doctor-schedule";

// Định nghĩa schema Zod
const scheduleSchema = z.object({
	doctor_id: z.string().nonempty({ message: "Vui lòng chọn bác sĩ" }),
	date: z
		.string()
		.nonempty({ message: "Ngày là bắt buộc" })
		.refine((value) => !isNaN(Date.parse(value)), {
			message: "Ngày phải là định dạng ISO hợp lệ (VD: 2025-09-18)",
		}),
	shift: z.enum([Shift.MORNING, Shift.AFTERNOON, Shift.OVERTIME], {
		message: "Ca làm việc không hợp lệ",
	}),
	consecutiveWeeks: z
		.number()
		.int()
		.min(1, { message: "Số tuần liên tục phải từ 1 trở lên" })
		.max(5, { message: "Số tuần liên tục không được vượt quá 5" }),
});

// Props cho component
interface CreateScheduleFormProps {
	doctors: Doctor[];
	defaultDate: string; // Chuỗi ISO (VD: "2025-09-18")
	defaultShift: Shift;
	onCreateSchedule: (payload: CreateDoctorScheduleDto) => Promise<void>;
}

export function CreateScheduleForm(props: CreateScheduleFormProps) {
	const { doctors, defaultDate, defaultShift, onCreateSchedule } = props;
	// Khởi tạo form với react-hook-form và Zod
	const form = useForm<CreateDoctorScheduleDto>({
		resolver: zodResolver(scheduleSchema),
		defaultValues: {
			doctor_id: "",
			date: defaultDate,
			shift: defaultShift,
			consecutiveWeeks: 1,
		},
	});
	
	// Định dạng ngày thành DD/MM/YYYY
	const formatDate = (isoString: string) => {
		try {
			return format(new Date(isoString), "dd/MM/yyyy");
		} catch {
			return isoString; // Trả về nguyên bản nếu không parse được
		}
	};
	
	// Xử lý submit form
	const onSubmit = async (payload: CreateDoctorScheduleDto) => {
		await onCreateSchedule(payload);
		form.reset({
			doctor_id: "",
			date: defaultDate,
			shift: defaultShift,
			consecutiveWeeks: 1,
		});
	};
	
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
			<div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
				{/* Vòng tròn trang trí */}
				<div className="absolute top-0 left-0 w-32 h-32 bg-green-100/30 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
				<div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full translate-x-1/3 translate-y-1/3"></div>
				
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{/* Tiêu đề form */}
						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">Tạo lịch làm việc</h2>
							<p className="text-gray-500 text-sm">Vui lòng nhập thông tin để tạo lịch cho bác sĩ</p>
						</div>
						
						{/* Trường Doctor ID (Dropdown) */}
						<FormField
							control={form.control}
							name="doctor_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bác sĩ</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className="w-full border-gray-300 focus:ring-green-400">
												<SelectValue placeholder="Chọn bác sĩ" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{doctors.map((doctor) => (
												<SelectItem key={doctor.user_id} value={doctor.user_id}>
													{doctor.full_name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						{/* Trường Date (Readonly) */}
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ngày</FormLabel>
									<FormControl>
										<Input
											value={formatDate(field.value)} // Hiển thị định dạng DD/MM/YYYY
											readOnly
											className="w-full bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						{/* Trường Shift (Readonly) */}
						<FormField
							control={form.control}
							name="shift"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ca làm việc</FormLabel>
									<FormControl>
										<Input
											{...field}
											readOnly
											className="w-full bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						{/* Trường Consecutive Weeks (Dropdown) */}
						<FormField
							control={form.control}
							name="consecutiveWeeks"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số tuần liên tục</FormLabel>
									<Select
										onValueChange={(value) => field.onChange(Number(value))}
										defaultValue={field.value.toString()}
									>
										<FormControl>
											<SelectTrigger className="w-full border-gray-300 focus:ring-green-400">
												<SelectValue placeholder="Chọn số tuần" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{[1, 2, 3, 4, 5].map((week) => (
												<SelectItem key={week} value={week.toString()}>
													{ week === 1 ? "Tuần này" : `${week} tuần`  }
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						{/* Nút Submit */}
						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full bg-green-300 hover:bg-green-400 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
						>
							{form.formState.isSubmitting ? (
								<div className="w-5 h-5 border-2 border-gray-600/30 border-t-gray-600 rounded-full animate-spin"></div>
							) : (
								"Tạo lịch"
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}