import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
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
import { Checkbox } from "@/components/ui/checkbox";

const createClinicServiceSchema = z.object({
	name: z
		.string({ message: "Tên dịch vụ là bắt buộc." })
		.min(2, { message: "Tên dịch vụ phải có ít nhất 2 ký tự." })
		.max(100, { message: "Tên dịch vụ không được vượt quá 100 ký tự." }),
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
});

export type CreateClinicServiceDto = z.infer<typeof createClinicServiceSchema>;

export interface CreateClinicServiceFormProps {
	onCreateClinicService: (data: CreateClinicServiceDto) => void;
}
export function CreateClinicServiceForm(
	props: CreateClinicServiceFormProps
) {
	const { onCreateClinicService } = props;
	const form = useForm<CreateClinicServiceDto>({
		resolver: zodResolver(createClinicServiceSchema),
		defaultValues: {
			name: "",
			description: "",
			price: undefined,
			duration_minutes: undefined,
			requires_doctor: false,
		},
	});
	
	
	const onSubmit = (data: CreateClinicServiceDto) => {
		onCreateClinicService(data);
		form.reset();
	};
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-gradient-to-r from-indigo-200 to-indigo-300 text-gray-800 hover:from-indigo-300 hover:to-indigo-400 transition-all duration-200 cursor-pointer">
					Thêm Dịch Vụ
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-lg backdrop-blur-md">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-gray-700 text-center">
						Tạo dịch vụ khám
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{/* Name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Tên dịch vụ *
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập tên dịch vụ"
											{...field}
											className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-300 rounded-lg"
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
										<Input
											placeholder="Nhập mô tả dịch vụ"
											{...field}
											className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						
						{/* Price */}
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
											className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-300 rounded-lg"
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
											{...field}
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value ? parseInt(e.target.value, 10) : undefined
												)
											}
											className="border-gray-200 focus:border-indigo-300 focus:ring-indigo-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						
						{/* Requires Doctor */}
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
										Có thể đặt bác sĩ ?
									</FormLabel>
								</FormItem>
							)}
						/>
						
						{/* Submit */}
						<Button
							type="submit"
							className="cursor-pointer w-full bg-gradient-to-br from-indigo-300 to-indigo-200 text-gray-800 hover:from-indigo-400 hover:to-indigo-500 transition-all duration-200"
						>
							Tạo Dịch Vụ
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
