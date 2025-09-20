import {CreateAppointmentRequestDto} from "@/types/appointment-request";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {useSession} from "next-auth/react";
import {CREATE_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";
import {ApiErrorResponse, CustomSession} from "@/types/login";
import {toast} from "react-toastify";

export function useCreateAppointmentRequest() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return  useMutation({
		mutationKey: ["createAppointmentRequest"],
		mutationFn: async (data: CreateAppointmentRequestDto) => {
			const token = session?.access_token;

			if (!session?.access_token) {
				throw new Error("User must be authenticated");
			}

			const res = await axios.post(
				CREATE_APPOINTMENT_REQUEST,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return res.data;
		},
		onSuccess: () => {
			toast.success("Tạo yêu cầu thành công", { toastId: "create-appointment-request-success" });
		},
		onError: (error: AxiosError<ApiErrorResponse>) => {
			toast.error(error?.message, { toastId: "create-appointment-request-error" });
		},
	});
	
}
