import {useMutation} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import {CustomSession} from "@/types/login";
import {toast} from "react-toastify";
import axios, {AxiosError} from "axios";
import {CREATE_SERVICES_API_URL} from "@/lib/api/clinic-service";
import {
	CreateClinicServiceDto
} from "@/app/(admin)/service-manage/_component/createClinicServiceForm/createClinicServiceForm";

export function useCreateClinicService() {
	const { data: session } = useSession() as { data: CustomSession | null }
	
	return useMutation({
		mutationKey: ["createClinicService"],
		mutationFn: async (payload: CreateClinicServiceDto) => {
			const res = await axios.post(
				CREATE_SERVICES_API_URL, payload,
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Tạo dịch vụ thành công", { toastId: "create-clinic-service-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message, { toastId: "create-clinic-service-error" });
		}
	});
}