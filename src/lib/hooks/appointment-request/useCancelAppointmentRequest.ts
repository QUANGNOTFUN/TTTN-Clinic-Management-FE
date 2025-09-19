import { useMutation } from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/login";
import {CANCEL_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";
import {toast} from "react-toastify";

export function useCancelAppointmentRequest() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useMutation({
		mutationKey: ["cancelAppointmentRequest"],
		mutationFn: async (id: string) => {
			const res = await axios.patch(
				CANCEL_APPOINTMENT_REQUEST(id),
				{},
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			
			return res.data;
		},
		onSuccess: () => {
			toast.success("Hủy lịch hẹn thành công", { toastId: "cancel-appointment-request-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message, { toastId: "cancel-appointment-request-error" });
		},
	});
}
