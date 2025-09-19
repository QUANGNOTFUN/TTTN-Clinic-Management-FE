import {CustomSession} from "@/types/login";
import { useSession } from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {UPDATE_PATIENT_API_URL} from "@/lib/api/patient";
import axios, {AxiosError} from "axios";
import {ProfileFormValues} from "@/app/(user)/profile/_component/ProfileUpdateForm";
import {toast} from "react-toastify";

export function useUpdatePatient() {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useMutation({
		mutationKey: ["updatePatient"],
		mutationFn: async ({id, payload} : {id: string, payload: ProfileFormValues}) => {
			const res = await axios.patch(
				UPDATE_PATIENT_API_URL(id),
				payload,
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					}
				}
			);
			
			return res.data;
		},
		onSuccess: () => {
			toast.success("Cập nhật thông tin thành công", { toastId: "update-patient-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message, { toastId: "update-patient-error" });
		},
	})
}