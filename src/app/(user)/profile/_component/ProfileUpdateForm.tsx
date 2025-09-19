import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PatientUpdate } from "@/types/patient";

// Zod schema
const profileSchema = z.object({
	full_name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
	gender: z.enum(["MALE", "FEMALE", "OTHER"]),
	date_of_birth: z
		.string()
		.refine((v) => !v || !Number.isNaN(Date.parse(v)), {
			message: "Ngày sinh không hợp lệ",
		}),
	medical_history: z.string().max(2000).optional(),
	address: z.string().max(300).optional(),
	phone_number: z
		.string()
		.regex(/^\+?\d{9,15}$/, "Số điện thoại không hợp lệ (9-15 chữ số, có thể có +)"),
	blood_type: z.enum(["A", "B", "AB", "O", "UNKNOWN"]).optional(),
	emergency_contact: z.string().max(100).optional(),
	insurance_number: z.string().max(100).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileUpdateFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	patient?: PatientUpdate;
	onSubmit: (payload: ProfileFormValues) => Promise<void> | void;
	submitLabel?: string;
};

export function ProfileUpdateForm(props: ProfileUpdateFormProps) {
	const { open, onOpenChange, patient, onSubmit, submitLabel = "Cập nhật" } = props;
	
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			full_name: patient?.full_name ?? "",
			gender: (patient?.gender as "MALE" | "FEMALE") ?? undefined,
			date_of_birth: patient?.date_of_birth
				? patient.date_of_birth.slice(0, 10)
				: "",
			medical_history: patient?.medical_history ?? "",
			address: patient?.address ?? "",
			phone_number: patient?.phone_number ?? "",
			blood_type:
				(patient?.blood_type as "A" | "B" | "AB" | "O" | "UNKNOWN") ?? "UNKNOWN",
			emergency_contact: patient?.emergency_contact ?? "",
			insurance_number: patient?.insurance_number ?? "",
		},
	});
	
	const handleSubmit = async (values: ProfileFormValues) => {
		const payload = {
			...values,
			date_of_birth: values.date_of_birth ? new Date(values.date_of_birth).toISOString() : null,
		};
		
		try {
			await onSubmit(payload);
			onOpenChange(false);
			form.reset(values);
		} catch (err) {
			console.error("Update error", err);
		}
	};
	
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-md">
					Chỉnh sửa hồ sơ
				</Button>
			</DialogTrigger>
			
			<DialogContent className="max-w-lg w-full p-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
				<DialogHeader>
					<DialogTitle className="text-center text-xl font-semibold text-teal-600">
						Cập nhật thông tin bệnh nhân
					</DialogTitle>
				</DialogHeader>
				
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2 p-4"
					>
						{/* Họ và tên */}
						<FormField
							control={form.control}
							name="full_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Họ và tên *</FormLabel>
									<FormControl>
										<Input
											placeholder="Nguyễn Văn A"
											{...field}
											className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						{/* Giới tính + Ngày sinh */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-700">Giới tính *</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value ?? ""}
											>
												<SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
													<SelectValue placeholder="Chọn giới tính" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="MALE">Nam</SelectItem>
													<SelectItem value="FEMALE">Nữ</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							
							<FormField
								control={form.control}
								name="date_of_birth"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-gray-700">Ngày sinh *</FormLabel>
										<FormControl>
											<Input
												type="date"
												{...field}
												className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						
						{/* Các field khác */}
						<FormField
							control={form.control}
							name="phone_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Số điện thoại *</FormLabel>
									<FormControl>
										<Input
											placeholder="+84901234567"
											{...field}
											className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Địa chỉ</FormLabel>
									<FormControl>
										<Input
											placeholder="Số nhà, đường, phường..."
											{...field}
											className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="blood_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Nhóm máu</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value ?? "UNKNOWN"}
										>
											<SelectTrigger className="border-gray-300 focus:border-teal-500 focus:ring-teal-500">
												<SelectValue placeholder="Chọn nhóm máu" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="A">A</SelectItem>
												<SelectItem value="B">B</SelectItem>
												<SelectItem value="AB">AB</SelectItem>
												<SelectItem value="O">O</SelectItem>
												<SelectItem value="UNKNOWN">Không rõ</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="emergency_contact"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">
										Người liên hệ khẩn cấp
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Tên - SĐT"
											{...field}
											className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="insurance_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Số bảo hiểm</FormLabel>
									<FormControl>
										<Input
											placeholder="Mã BHYT / bảo hiểm"
											{...field}
											className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name="medical_history"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700">Lịch sử bệnh</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Các bệnh nền, phẫu thuật..."
											{...field}
											className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<DialogFooter className="flex gap-3 pt-2">
							<Button
								type="submit"
								className="mx-auto bg-teal-500 hover:bg-teal-600 text-white shadow-md cursor-pointer"
							>
								{submitLabel}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
