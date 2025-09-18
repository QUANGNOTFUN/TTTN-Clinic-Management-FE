import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CustomSession} from "@/types/login";
import {AppointmentRequest} from "@/types/appointment-request";
import {FIND_ALL_APPOINTMENT_REQUEST_BY_ID_API_URL} from "@/lib/api/appointment-request";

export function useFindAllAppointmentRequestById(id: string) {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useQuery({
		queryKey: ["findAllAppointmentRequestById", id],
		queryFn: async () => {
			const res = await axios.get<AppointmentRequest[]>(
				FIND_ALL_APPOINTMENT_REQUEST_BY_ID_API_URL(id),
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			return res.data;
		},
		enabled: !!session?.access_token && !!id,
	});
}
