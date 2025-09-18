import {CustomSession} from "@/types/login";
import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {DELETE_SERVICES_API_URL} from "@/lib/api/clinic-service";
import axios, {AxiosError} from "axios";
import { toast } from "react-toastify";

export function useDeleteClinicService() {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useMutation({
		mutationKey: ["deleteClinicService"],
		mutationFn: async (id: string) => {
			const res = await axios.delete(
				DELETE_SERVICES_API_URL(id),
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			
			return res.data;
		},
		onSuccess: () => {
			toast.success("Xóa dịch vụ thành công", { toastId: "delete-clinic-service-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message, { toastId: "delete-clinic-service-error" });
		},
	})
}