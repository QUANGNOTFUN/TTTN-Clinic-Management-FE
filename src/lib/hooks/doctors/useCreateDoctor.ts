import {CustomSession} from "@/types/login";
import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {CREATE_DOCTOR_API_URL} from "@/lib/api/doctor";
import axios, {AxiosError} from "axios";
import {CreateDoctorDto} from "@/types/doctor";
import {toast} from "react-toastify";

export function useCreateDoctor() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useMutation({
		mutationKey: ["createDoctor"],
		mutationFn: async (payload: CreateDoctorDto) => {
			
			const res = await axios.post(
				CREATE_DOCTOR_API_URL,
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
			toast.success("Tạo tài khoản thành công", { toastId: "create-doctor-success" });
		},
		onError: (error: AxiosError) => {
			const message = error.message || "Có lỗi xảy ra";
			toast.error(message, { toastId: "create-doctor-error" });
		},
	});
	
}
