import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { useFindAllClinicServices } from '@/lib/hooks/clinic-services/useFindAllClinicServices';
import {Doctor} from "@/types/doctor";
import {MultiSelect} from "@/app/(admin)/doctor-manage/_components/updateDoctorForm/MultiSelect";

// Định nghĩa schema validation
export const updateDoctorSchema = z.object({
	full_name: z
		.string({ message: 'Tên đầy đủ là bắt buộc.' })
		.min(2, { message: 'Tên phải có ít nhất 2 ký tự.' }),
	gender: z
		.string({ message: 'Giới tính là bắt buộc.' })
		.min(1, { message: 'Giới tính không được để trống.' }),
	phone_number: z
		.string({ message: 'Số điện thoại là bắt buộc.' })
		.min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự.' }),
	specialty: z
		.string({ message: 'Chuyên khoa là bắt buộc.' })
		.min(2, { message: 'Chuyên khoa phải có ít nhất 2 ký tự.' }),
	bio: z
		.string({ message: 'Tiểu sử là bắt buộc.' })
		.min(10, { message: 'Tiểu sử phải có ít nhất 10 ký tự.' }),
	services_id: z
		.array(
			z
				.string({ message: 'ID dịch vụ phải là chuỗi.' })
				.uuid({ message: 'ID dịch vụ phải là UUID hợp lệ.' }),
			{ message: 'Danh sách dịch vụ phải là một mảng.' }
		)
		.min(1, { message: 'Phải chọn ít nhất một dịch vụ.' }),
});

export type UpdateDoctorDto = z.infer<typeof updateDoctorSchema>;

type UpdateDoctorFormProps = {
	doctor?: Doctor;
	onSubmitUpdate: (data: UpdateDoctorDto) => void;
	onClose: () => void;
};

export function UpdateDoctorForm(props: UpdateDoctorFormProps) {
	const { doctor, onSubmitUpdate, onClose } = props;
	const { data: services = [], isLoading: servicesLoading } = useFindAllClinicServices();
	const servicesIds = services?.map((service) => service.id) ?? [];
	
	const form = useForm<UpdateDoctorDto>({
		resolver: zodResolver(updateDoctorSchema),
		defaultValues: {
			full_name: doctor?.full_name ?? '',
			gender: doctor?.gender ?? '',
			phone_number: doctor?.phone_number ?? '',
			specialty: doctor?.specialty ?? '',
			bio: doctor?.bio ?? '',
			services_id: servicesIds ?? [],
		},
	});
	
	const onSubmit = (data: UpdateDoctorDto) => {
		onSubmitUpdate(data);
		form.reset();
	};
	
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			{/* Overlay với background blur */}
			<div className="fixed inset-0 bg-black/10 backdrop-blur" />
			{/* Form container */}
			<div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-[425px] z-50">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200"
				>
					<X className="h-6 w-6" />
				</button>
				<h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
					Cập Nhật Thông Tin Bác Sĩ
				</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto h-[80vh]">
						<FormField
							control={form.control}
							name="full_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Tên đầy đủ
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập tên đầy đủ"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Giới tính
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg">
													<SelectValue placeholder="Chọn giới tính" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="MALE">Nam</SelectItem>
												<SelectItem value="FEMALE">Nữ</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Số điện thoại
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập số điện thoại"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="specialty"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Chuyên khoa
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Nhập chuyên khoa"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Tiểu sử
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Nhập tiểu sử"
											{...field}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg min-h-[100px]"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="services_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Dịch vụ
									</FormLabel>
									<FormControl>
										<MultiSelect
											options={services.map((service) => ({
												value: service.id,
												label: service.name,
											}))}
											value={field.value || []}
											onChange={field.onChange}
											placeholder="Chọn dịch vụ"
											disabled={servicesLoading}
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={form.formState.isSubmitting || servicesLoading}
							className="w-full bg-gradient-to-r from-teal-200 to-teal-300 text-gray-800 hover:from-teal-300 hover:to-teal-400 transition-all duration-200 cursor-pointer disabled:bg-gray-400"
						>
							{form.formState.isSubmitting || servicesLoading ? 'Đang xử lý...' : 'Cập Nhật'}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}