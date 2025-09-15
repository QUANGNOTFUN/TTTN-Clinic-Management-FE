import {CreateAppointmentRequestDto} from "@/types/appointment-request";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useSession} from "next-auth/react";
import {CREATE_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";
import {CustomSession} from "@/types/login";

export function useCreateAppointmentRequest() {
	const session = useSession() as { data: CustomSession | null };
	
	return  useMutation({
		mutationKey: ["createAppointmentRequest"],
		mutationFn: async (data: CreateAppointmentRequestDto) => {
			const token = session.data?.user.accessToken;

			if (!session.data?.user) {
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
	});
	
}
