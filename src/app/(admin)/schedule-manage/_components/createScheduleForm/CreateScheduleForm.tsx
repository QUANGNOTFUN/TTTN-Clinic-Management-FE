import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Doctor } from "@/types/doctor";
import { Shift } from "@/types/doctor-schedule";
import { X } from "lucide-react";

// Schema validate
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

export type CreateDoctorScheduleDto = z.infer<typeof scheduleSchema>;

interface CreateScheduleFormProps {
	doctors: Doctor[];
	defaultDate: string;
	defaultShift: Shift;
	onCreateSchedule: (payload: CreateDoctorScheduleDto) => Promise<void>;
	onClose: () => void;
}

export function CreateScheduleForm(props: CreateScheduleFormProps) {
	const { doctors, defaultDate, defaultShift, onCreateSchedule, onClose } = props;
	
	const form = useForm<CreateDoctorScheduleDto>({
		resolver: zodResolver(scheduleSchema),
		defaultValues: {
			doctor_id: "",
			date: defaultDate,
			shift: defaultShift,
			consecutiveWeeks: 1,
		},
	});
	
	const formatDate = (isoString: string) => {
		try {
			return format(new Date(isoString), "dd/MM/yyyy");
		} catch {
			return isoString;
		}
	};
	
	const onSubmit = async (payload: CreateDoctorScheduleDto) => {
		await onCreateSchedule(payload);
		form.reset();
	};
	
	const onClinkClose = () => {
		form.reset();
		onClose();
	}
	
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			{/* Overlay blur */}
			<div className="fixed inset-0 bg-black/10 backdrop-blur" />
			
			{/* Form container */}
			<div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-[425px] z-50">
				{/* Nút đóng */}
				<button
					onClick={onClinkClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200"
				>
					<X className="h-6 w-6" />
				</button>
				
				{/* Tiêu đề */}
				<h2 className="text-2xl text-center font-bold text-gray-700 pb-4 mb-4 border-b">Tạo lịch làm việc</h2>
				
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col items-center space-y-4"
					>
						{/* Bác sĩ */}
						<FormField
							control={form.control}
							name="doctor_id"
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel className="text-sm font-medium text-gray-700">Bác sĩ</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg">
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
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						
						{/* Ngày (readonly) */}
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel className="text-sm font-medium text-gray-700">Ngày</FormLabel>
									<FormControl>
										<Input
											value={formatDate(field.value)}
											readOnly
											className="bg-gray-100 text-gray-600 cursor-not-allowed border-gray-200 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						
						{/* Ca làm việc */}
						<FormField
							control={form.control}
							name="shift"
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel className="text-sm font-medium text-gray-700">Ca làm việc</FormLabel>
									<Select onValueChange={field.onChange} value={field.value} disabled>
										<FormControl>
											<SelectTrigger className="bg-gray-100 text-gray-600 cursor-not-allowed border-gray-200 rounded-lg">
												<SelectValue placeholder={field.value || "Chọn ca"} />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value={Shift.MORNING}>Sáng</SelectItem>
											<SelectItem value={Shift.AFTERNOON}>Chiều</SelectItem>
											<SelectItem value={Shift.OVERTIME}>Tăng ca</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						
						{/* Số tuần liên tục */}
						<FormField
							control={form.control}
							name="consecutiveWeeks"
							render={({ field }) => (
								<FormItem className="w-full max-w-sm">
									<FormLabel className="text-sm font-medium text-gray-700">Số tuần liên tục</FormLabel>
									<Select
										onValueChange={(value) => field.onChange(Number(value))}
										value={field.value.toString()}
									>
										<FormControl>
											<SelectTrigger className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg">
												<SelectValue placeholder="Chọn số tuần" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{[1, 2, 3, 4, 5].map((week) => (
												<SelectItem key={week} value={week.toString()}>
													{week === 1 ? "Tuần này" : `${week} tuần`}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						
						{/* Nút submit */}
						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="w-full max-w-sm bg-gradient-to-r from-green-300 to-green-400 text-gray-800 font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-200"
						>
							{form.formState.isSubmitting ? (
								<div className="w-5 h-5 border-2 border-gray-600/30 border-t-gray-600 rounded-full animate-spin mx-auto" />
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
