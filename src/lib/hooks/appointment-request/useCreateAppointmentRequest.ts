import {CreateAppointmentRequestDto} from "@/types/appointment-request";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useSession} from "next-auth/react";
import {CREATE_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";
import {CustomSession} from "@/types/login";

export function useCreateAppointmentRequest() {
	const session = useSession() as { data: CustomSession | null };
	
	const mutation = useMutation({
		mutationFn: async (data: CreateAppointmentRequestDto) => {
			const token = session.data?.user.accessToken;
			
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
	});
	
	return {
		create: mutation.mutateAsync,
		data: mutation.data,
		loading: mutation.isPending,
		error: mutation.error,
	};
}
