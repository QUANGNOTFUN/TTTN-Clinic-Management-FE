import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CustomSession} from "@/types/login";
import {AppointmentRequest} from "@/types/appointment-request";
import { FIND_ALL_APPOINTMENT_REQUEST_BY_SERVICE_API_URL } from "@/lib/api/appointment-request";
import {toVnISOString} from "@/lib/function/toVnISOString";

export function useFindAllAppointmentRequestByService(id: string, date: Date) {
	const { data: session } = useSession() as { data: CustomSession | null };
	const formattedDate = toVnISOString(date);
	
	return useQuery({
		queryKey: ["findAllAppointmentRequestByService", id, formattedDate],
		queryFn: async () => {
			const res = await axios.get<AppointmentRequest[]>(
				FIND_ALL_APPOINTMENT_REQUEST_BY_SERVICE_API_URL(id, formattedDate),
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			return res.data;
		},
		staleTime: 5 * 60 * 1000,
		retry: 1,
		refetchOnWindowFocus: false,
		enabled: !!session?.access_token && !!id,
	});
}
