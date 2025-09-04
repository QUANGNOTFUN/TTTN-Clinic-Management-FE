import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClinicServiceResponse } from "@/models/clinic-service";

// Props
export type AppointmentFormCardProps = {
	className?: string;
	service?: ClinicServiceResponse;
	userId?: string;
};

// Validation schema
const formSchema = z.object({
	idService: z.string(),
	idUser: z.string(),
	name: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
	phone: z.string().regex(/^\d{9,11}$/, "Số điện thoại phải từ 9–11 số"),
	doctorId: z.string().optional(),
	date: z.string().min(1, "Vui lòng chọn ngày"),
	shift: z.enum(["MORNING", "AFTERNOON"], {
		message: "Vui lòng chọn ca làm việc",
	}),
	time: z.string().min(1, "Vui lòng chọn giờ"),
});

type FormValues = z.infer<typeof formSchema>;

export function AppointmentFormCard(props: AppointmentFormCardProps) {
	const { className, service, userId } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			idService: service?.id ?? "",
			idUser: userId,
			date: new Date().toISOString().split("T")[0],
			time: new Date().toTimeString().slice(0, 5),
		},
	});
	
	const shift = watch("shift"); // 👀 theo dõi shift
	const timeRange =
		shift === "MORNING"
			? { min: "08:00", max: "11:30" }
			: shift === "AFTERNOON"
				? { min: "13:30", max: "17:00" }
				: undefined;
	
	const onSubmit = async (data: FormValues) => {
		console.log("Booking info:", data);
		// 🚀 call API here
		reset();
	};
	
	return (
		<div
			className={`
		        ${className}
		        rounded-2xl
		        bg-gradient-to-br from-slate-700 via-zinc-500 to-gray-800
		        shadow-md hover:shadow-xl
		        transform transition-all duration-300
		        p-6 md:p-10
		        flex flex-col justify-center
		    `}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
				{/* Hidden fields */}
				<input type="hidden" {...register("idService")} />
				<input type="hidden" {...register("idUser")} />
				
				{/* Full name */}
				<div className="flex items-center gap-4">
					<label className="w-32 text-gray-200 text-sm md:text-base">Họ và tên</label>
					<div className="flex-1">
						<input
							type="text"
							{...register("name")}
							placeholder="Nhập họ và tên"
							className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-slate-800
		                       text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400
		                       text-sm md:text-base"
						/>
						{errors.name && <p className="text-red-400 text-sm ml-4 mt-1">{errors.name.message}</p>}
					</div>
				</div>
				
				{/* Phone number */}
				<div className="flex items-center gap-4">
					<label className="w-32 text-gray-200 text-sm md:text-base">Số điện thoại</label>
					<div className="flex-1">
						<input
							type="tel"
							{...register("phone")}
							placeholder="Nhập số điện thoại"
							className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-slate-800
		                       text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400
		                       text-sm md:text-base"
						/>
						{errors.phone && <p className="text-red-400 text-sm ml-4 mt-1">{errors.phone.message}</p>}
					</div>
				</div>
				
				{/* Doctor selection if required */}
				{service?.requiresDoctorSelection && (
					<div className="flex items-center gap-4">
						<label className="w-32 text-gray-200 text-sm md:text-base">Chọn bác sĩ</label>
						<div className="flex-1">
							<select
								{...register("doctorId")}
								className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-slate-800
		                         text-gray-100 focus:ring-2 focus:ring-indigo-400 text-sm md:text-base"
							>
								<option value="">-- Chọn bác sĩ --</option>
								{/* ⚡ TODO: load doctors from API */}
								<option value="doctor-1">Bác sĩ A</option>
								<option value="doctor-2">Bác sĩ B</option>
							</select>
							{errors.doctorId && (
								<p className="text-red-400 text-sm ml-4 mt-1">{errors.doctorId.message}</p>
							)}
						</div>
					</div>
				)}
				
				{/* Appointment date */}
				<div className="flex items-center gap-4">
					<label className="w-32 text-gray-200 text-sm md:text-base">Ngày hẹn</label>
					<div className="flex-1">
						<input
							type="date"
							{...register("date")}
							className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-slate-800
		                       text-gray-100 focus:ring-2 focus:ring-indigo-400
		                       text-sm md:text-base"
						/>
						{errors.date && <p className="text-red-400 text-sm ml-4 mt-1">{errors.date.message}</p>}
					</div>
				</div>
				
				{/* Shift selection */}
				<div className="flex items-center gap-4">
					<label className="w-32 text-gray-200 text-sm md:text-base">Ca làm việc</label>
					<div className="flex-1">
						<div className="flex gap-4 px-4 py-2 rounded-lg border border-gray-600 bg-slate-800 shadow-sm">
							<label className="flex items-center gap-2 text-gray-100">
								<input type="radio" value="MORNING" {...register("shift")} />
								Ca sáng
							</label>
							<label className="flex items-center gap-2 text-gray-100">
								<input type="radio" value="AFTERNOON" {...register("shift")} />
								Ca chiều
							</label>
						</div>
						{errors.shift && <p className="text-red-400 text-sm ml-4 mt-1">{errors.shift.message}</p>}
					</div>
				</div>
				
				{/* Time selection */}
				<div className="flex items-center gap-4">
					<label className="w-32 text-gray-200 text-sm md:text-base">Giờ hẹn</label>
					<div className="flex-1">
						<input
							type="time"
							{...register("time")}
							min={timeRange?.min}
							max={timeRange?.max}
							className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-slate-800
			                 text-gray-100 focus:ring-2 focus:ring-indigo-400
			                 text-sm md:text-base"
						/>
						{errors.time && <p className="text-red-400 text-sm ml-4 mt-1">{errors.time.message}</p>}
						
						{/* Ghi chú hướng dẫn */}
						{shift && (
							<p className="text-gray-200 text-base ml-4 mt-1 italic">
								{shift === "MORNING"
									? "Vui lòng chọn thời gian từ 08:00 đến 11:30"
									: "Vui lòng chọn thời gian từ 13:30 đến 17:00"}
							</p>
						)}
					</div>
				</div>
				
				{/* Submit button */}
				<div className="flex justify-center">
					<button
						type="submit"
						className="w-[50%] mt-4 py-3 px-6 rounded-lg
		                  bg-gradient-to-br from-gray-500 via-gray-600 to-gray-900
		                  text-white font-medium shadow-md
		                  hover:from-slate-800 hover:via-gray-700 hover:to-gray-700
		                  transition-all duration-300 text-sm md:text-base
		                  cursor-pointer"
					>
						Xác nhận đặt lịch
					</button>
				</div>
			</form>
		</div>
	);
}
