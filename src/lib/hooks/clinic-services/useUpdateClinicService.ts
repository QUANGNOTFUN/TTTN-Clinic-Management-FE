import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/login";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { UPDATE_SERVICES_API_URL } from "@/lib/api/clinic-service";
import { toast } from "react-toastify";
import { UpdateClinicServiceDto } from "@/app/(admin)/service-manage/_component/updateClinicServiceForm/UpdateClinicServiceForm";

type UpdateClinicServicePayload = {
	id: string;
	payload: UpdateClinicServiceDto;
};

export function useUpdateClinicService() {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useMutation({
		mutationKey: ["updateClinicService"],
		mutationFn: async ({ id, payload }: UpdateClinicServicePayload) => {
			const res = await axios.put(
				UPDATE_SERVICES_API_URL(id),
				payload,
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Cập nhật dịch vụ thành công", { toastId: "update-clinic-service-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message ?? error.message, {
				toastId: "update-clinic-service-error",
			});
		},
	});
}
