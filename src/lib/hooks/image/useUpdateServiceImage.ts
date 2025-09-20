import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import {ApiErrorResponse, CustomSession } from '@/types/login';
import {UPDATE_SERVICE_IMAGE_API_URL} from "@/lib/api/image";

interface UpdateServiceImagePayload {
	serviceId: string;
	image: File;
}

interface UpdateServiceImageResponse {
	url: string;
}

export const useUpdateServiceImage = () => {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useMutation<
		UpdateServiceImageResponse,
		AxiosError<ApiErrorResponse>,
		UpdateServiceImagePayload
	>({
		mutationKey: ['updateServiceImage'],
		mutationFn: async ({ serviceId, image }: UpdateServiceImagePayload) => {
			if (!session?.access_token) throw new Error('Chưa đăng nhập');
			
			const formData = new FormData();
			formData.append('image', image);
			
			const res = await axios.patch(
				UPDATE_SERVICE_IMAGE_API_URL(serviceId),
				formData,
				{
					headers: {
						Authorization: `Bearer ${session.access_token}`,
					},
					timeout: 60000,
				}
			);
			return res.data;
		},
		retry: (failureCount, error: AxiosError) => {
			return failureCount < 3 && (error.response?.status === 503 || error.code === 'ECONNABORTED');
		},
		onSuccess: () => {
			toast.success('Cập nhật ảnh dịch vụ thành công', {
				toastId: 'update-service-image-success',
			});
		},
		onError: (error: AxiosError<ApiErrorResponse>) => {
			const message = error.response?.data?.message || 'Có lỗi khi cập nhật ảnh dịch vụ';
			return new Error(Array.isArray(message) ? message.join(', ') : message);
		},
	});
};