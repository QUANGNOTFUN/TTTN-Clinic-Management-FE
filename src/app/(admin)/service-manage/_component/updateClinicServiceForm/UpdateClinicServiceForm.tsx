import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {X} from "lucide-react";

// Schema validation cho clinic service
const updateClinicServiceSchema = z.object({
	name: z
		.string({ message: "Tên dịch vụ là bắt buộc." })
		.min(2, { message: "Tên dịch vụ phải có ít nhất 2 ký tự." }),
	description: z.string().optional(),
	price: z
		.number({ message: "Giá phải là số." })
		.min(1, { message: "Giá tối thiểu là 1." })
		.optional(),
	duration_minutes: z
		.number({ message: "Thời lượng phải là số." })
		.min(1, { message: "Thời lượng tối thiểu là 1 phút." })
		.optional(),
	requires_doctor: z.boolean().optional(),
	is_active: z.boolean().optional(),
});

export type UpdateClinicServiceDto = z.infer<typeof updateClinicServiceSchema>;

type UpdateClinicServiceFormProps = {
	service?: UpdateClinicServiceDto;
	onSubmitUpdate: (data: UpdateClinicServiceDto) => void;
	onClose: () => void;
};

export function UpdateClinicServiceForm(props: UpdateClinicServiceFormProps) {
	const { service, onSubmitUpdate, onClose } = props;
	
	const form = useForm<UpdateClinicServiceDto>({
		resolver: zodResolver(updateClinicServiceSchema),
		defaultValues: {
			name: service?.name ?? "",
			description: service?.description ?? "",
			price: service?.price ? Number(service.price) : 1,
			duration_minutes: service?.duration_minutes ?? 1,
			requires_doctor: service?.requires_doctor ?? false,
			is_active: service?.is_active ?? true,
		},
	});
	
	const onSubmit = (data: UpdateClinicServiceDto) => {
		onSubmitUpdate(data);
		form.reset();
	};
	
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="fixed inset-0 bg-black/10 backdrop-blur" />
			<div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-[425px] z-50">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200"
				>
					<X className="h-6 w-6" />
				</button>
				<h2 className="text-2xl font-bold text-gray-700 mb-4">
					Cập Nhật Dịch Vụ
				</h2>
				<p className="text-gray-500 mb-6">
					Vui lòng nhập đầy đủ thông tin để cập nhật dịch vụ.
				</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Tên dịch vụ
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập tên dịch vụ"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						{/* Description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Mô tả
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Nhập mô tả dịch vụ"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg min-h-[80px]"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						{/* Price */}
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Giá (VNĐ)
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="VD: 500000"
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value ? parseInt(e.target.value, 10) : undefined
												)
											}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						{/* Duration */}
						<FormField
							control={form.control}
							name="duration_minutes"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Thời lượng (phút)
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="VD: 30"
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value ? parseInt(e.target.value, 10) : undefined
												)
											}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						{/* Requires doctor */}
						<FormField
							control={form.control}
							name="requires_doctor"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-2 pl-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(val) => field.onChange(!!val)}
										/>
									</FormControl>
									<FormLabel className="text-sm font-medium text-gray-700">
										Có thể đặt bác sĩ?
									</FormLabel>
								</FormItem>
							)}
						/>
						{/* Is active */}
						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-2 pl-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(val) => field.onChange(!!val)}
										/>
									</FormControl>
									<FormLabel className="text-sm font-medium text-gray-700">
										Dịch vụ còn cung cấp hay không ?
									</FormLabel>
								</FormItem>
							)}
						/>
						{/* Submit button */}
						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-teal-200 to-teal-300 text-gray-800 hover:from-teal-300 hover:to-teal-400 transition-all duration-200 cursor-pointer"
						>
							Cập Nhật
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
