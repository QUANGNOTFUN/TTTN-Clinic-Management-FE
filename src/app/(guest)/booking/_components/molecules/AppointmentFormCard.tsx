import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {CreateAppointmentRequestDto} from "@/types/appointment-request"
import {useCreateAppointmentRequest} from "@/lib/hooks/appointment-request/useCreateAppointmentRequest"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Patient} from "@/types/patient";
import {ClinicService} from "@/types/clinic-service";
import {useFindAllDoctors} from "@/lib/hooks/doctors/useFindAllDoctors";
import {getNowUTC7} from "@/lib/function/getNowUTC7";

export type AppointmentFormCardProps = {
	className?: string
	service?: ClinicService
	userId?: Patient['user_id']
}

const formSchema = z.object({
	full_name: z.string().min(3, {message: "Tên phải có ít nhất 3 ký tự"}),
	phone_number: z.string().regex(/^\d{9,11}$/, { message: "Số điện thoại phải từ 9–11 số" }),
	doctor_id: z.string().optional(),
	date: z.string().min(1, { message: "Vui lòng chọn ngày" }),
	shift: z.enum(["MORNING", "AFTERNOON"], { message: "Vui lòng chọn ca làm việc" }),
	time: z.string().min(1, { message: "Vui lòng chọn giờ" }).max(5, { message: "Vui lòng chọn giờ"})
})

type FormValues = z.infer<typeof formSchema>

export function AppointmentFormCard({ className, service, userId }: AppointmentFormCardProps) {
	const { mutateAsync: create } = useCreateAppointmentRequest()
	const { data: doctors = []  } = useFindAllDoctors();
	const nowVNTime = getNowUTC7();
	
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			full_name: "",
			phone_number: "",
			doctor_id: undefined,
			date: nowVNTime.toISOString().slice(0, 10),
			shift: 'MORNING',
			time: "08:00",
		},
	})
	
	const filteredDoctors = service
		? doctors.filter((doctor) =>
			doctor.services?.some((s) => s.id === service.id)
		)
		: doctors
	
	
	const shift = form.watch("shift")
	const timeRange =
		shift === "MORNING"
			? { min: "08:00", max: "11:30" }
			: shift === "AFTERNOON" && { min: "13:30", max: "17:00" }
	
	const onSubmit = async (values: FormValues) => {
		console.log("ád")
		let appointmentDateTime = new Date(`${values.date}T${values.time}:00`)
		
		if (values.shift === "MORNING") {
			const minMorning = new Date(`${values.date}T08:00:00`)
			const maxMorning = new Date(`${values.date}T11:30:00`)
			if (appointmentDateTime < minMorning) appointmentDateTime = minMorning
			if (appointmentDateTime > maxMorning) appointmentDateTime = maxMorning
		} else {
			const minAfternoon = new Date(`${values.date}T13:30:00`)
			const maxAfternoon = new Date(`${values.date}T17:00:00`)
			if (appointmentDateTime < minAfternoon) appointmentDateTime = minAfternoon
			if (appointmentDateTime > maxAfternoon) appointmentDateTime = maxAfternoon
		}
		
		const payload: CreateAppointmentRequestDto = {
			full_name: values.full_name,
			phone_number: values.phone_number,
			patient_id: userId,
			service_id: service?.id,
			doctor_id: values.doctor_id ?? null,
			appointment_time: appointmentDateTime.toISOString(),
		}
		await create(payload)
		form.reset()
	}
	
	return (
		<div
			className={`rounded-2xl p-6 md:p-10 shadow-md ${className}
				 bg-gradient-to-tr from-gray-400 via-slate-300 to-gray-200
			`}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 flex flex-col overflow-y-auto h-full "
				>
					<FormField
						control={form.control}
						name="full_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-base font-semibold">Họ và tên *</FormLabel>
								<FormControl>
									<Input placeholder="Nhập họ và tên" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					
					<FormField
						control={form.control}
						name="phone_number"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-base font-semibold">Số điện thoại *</FormLabel>
								<FormControl>
									<Input type="tel" placeholder="Nhập số điện thoại" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					
					{/*Required doctor and date fields are required.*/}
					<div className="flex flex-col md:flex-row md:items-start md:space-x-20 space-y-4 md:space-y-0">
						{service?.requires_doctor && (
							<FormField
								control={form.control}
								name="doctor_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-base font-semibold">Chọn bác sĩ</FormLabel>
										<Select onValueChange={field.onChange}  value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="-- Chọn bác sĩ --" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{filteredDoctors.length > 0 ? (
													filteredDoctors.map((doc) => (
														<SelectItem key={doc.user_id} value={doc.user_id}>
															{doc.full_name} — {doc.specialty}
														</SelectItem>
													))
												) : (
													<SelectItem value="none" disabled>
														Không có bác sĩ phù hợp
													</SelectItem>
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base font-semibold">Ngày hẹn *</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					
					<div className="flex flex-col md:flex-row md:items-start md:space-x-20 space-y-4 md:space-y-0">
						<FormField
							control={form.control}
							name="shift"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base font-semibold">Ca làm việc *</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											value={field.value}
											className="flex gap-4 text-sm"
										>
											<div className="flex items-center gap-2">
												<RadioGroupItem value="MORNING" id="morning" />
												<label htmlFor="morning">Ca sáng</label>
											</div>
											<div className="flex items-center gap-2">
												<RadioGroupItem value="AFTERNOON" id="afternoon" />
												<label htmlFor="afternoon">Ca chiều</label>
											</div>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="time"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base font-semibold">Giờ hẹn *</FormLabel>
									<FormControl>
										<Input type="time" {...field} min={timeRange?.min} max={timeRange?.max} />
									</FormControl>
									<FormMessage />
									{shift && (
										<p className="text-sm text-gray-900 italic">
											{shift === "MORNING"
												? "Chọn giờ từ 08:00 đến 11:30"
												: "Chọn giờ từ 13:30 đến 17:00"}
										</p>
									)}
								</FormItem>
							)}
						/>
					</div>
					
					<Button size={"default"} type="submit" className="mx-auto my-auto items-end cursor-pointer">Xác nhận đặt lịch</Button>
				</form>
			</Form>
		</div>
	)
}
