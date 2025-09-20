import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {X} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {CustomSession, Role} from "@/types/login";
import {useUpdateServiceImage} from "@/lib/hooks/image/useUpdateServiceImage";
import Image from "next/image";
import {ClinicService} from "@/types/clinic-service";

// Validation schema
const updateImageSchema = z.object({
	id: z
		.string({ message: 'Vui lòng chọn một dịch vụ.' })
		.uuid({ message: 'ID dịch vụ phải là UUID hợp lệ.' }),
	image: z
		.instanceof(File)
		.refine((file) => file.size <= 5 * 1024 * 1024, {
			message: 'Kích thước ảnh không được vượt quá 5MB.',
		})
		.refine(
			(file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
			{ message: 'Chỉ hỗ trợ định dạng JPEG, PNG hoặc GIF.' }
		),
});

type UpdateImageFormData = z.infer<typeof updateImageSchema>;

export type UpdateImageFormProps = {
	service?: ClinicService;
	onClose: () => void;
};

export function UpdateImageForm(props: UpdateImageFormProps) {
	const { service, onClose } = props;
	const { data: session } = useSession() as { data: CustomSession | null };
	const isAdmin = session?.user?.role === Role.MANAGER;
	const [preview, setPreview] = useState<string | null>(null);
	
	const form = useForm<UpdateImageFormData>({
		resolver: zodResolver(updateImageSchema),
		defaultValues: {
			id: service?.id ?? '',
			image: undefined,
		},
	});
	
	const { mutate: updateServiceImage, isPending } = useUpdateServiceImage();
	
	if (!isAdmin) {
		return <p className="text-red-500">Chỉ quản lý có quyền truy cập chức năng này.</p>;
	}
	
	const onSubmit = (data: UpdateImageFormData) => {
		updateServiceImage({ serviceId: data.id, image: data.image });
		onClose();
	};
	
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			form.setValue('image', file);
			setPreview(URL.createObjectURL(file));
		} else {
			form.setValue('image', undefined);
			setPreview(null);
		}
	};
	
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="fixed inset-0 bg-black/10 backdrop-blur" />
			<div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-[425px] z-50">
				<button
					onClick={() => {
						form.reset();
						setPreview(null);
						onClose();
					}}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200"
				>
					<X className="h-6 w-6" />
				</button>
				<h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
					Cập Nhật Ảnh Dịch Vụ
				</h2>
				<p className="text-gray-500 mb-6">Cập nhật ảnh cho {service?.name}</p>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="image"
							render={() => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-gray-700">
										Ảnh dịch vụ
									</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/jpeg,image/png,image/gif"
											onChange={handleFileChange}
											className="border-gray-200 focus:border-teal-300 focus:ring-teal-300 rounded-lg"
										/>
									</FormControl>
									<FormMessage className="text-red-500 text-sm" />
								</FormItem>
							)}
						/>
						{preview && (
							<div className="mt-4">
								<p className="text-sm font-medium text-gray-700 mb-2">Xem trước:</p>
								<div className="flex items-center justify-center bg-zinc-300 p-4 rounded-lg space-x-2">
									<Image
										src={preview}
										alt="Preview"
										width={100}
										height={100}
										className="h-32 w-32 object-cover rounded-lg"
									/>
								</div>
							</div>
						)}
						<Button
							type="submit"
							disabled={form.formState.isSubmitting || isPending }
							className="w-full bg-gradient-to-r from-teal-200 to-teal-300 text-gray-800 hover:from-teal-300 hover:to-teal-400 transition-all duration-200 cursor-pointer disabled:bg-gray-400"
						>
							{form.formState.isSubmitting || isPending ? 'Đang xử lý...' : 'Cập Nhật'}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}