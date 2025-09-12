import {CreateAppointmentRequestDto} from "@/types/appointment-request";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useSession} from "next-auth/react";

export function useCreateAppointmentRequest() {
	const session = useSession();
	
	const mutation = useMutation({
		mutationFn: async (data: CreateAppointmentRequestDto) => {
			const token = session.data?.user.accessToken;
			
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}appointmentRequests/create`,
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
