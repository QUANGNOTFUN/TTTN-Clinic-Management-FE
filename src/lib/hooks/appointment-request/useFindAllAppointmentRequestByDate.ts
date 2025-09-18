import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CustomSession} from "@/types/login";
import {AppointmentRequest} from "@/types/appointment-request";
import {FIND_ALL_APPOINTMENT_REQUEST_BY_DATE} from "@/lib/api/appointment-request";
import {toVnISOString} from "@/lib/function/toVnISOString";

export function useFindAllAppointmentRequestByDate(date: Date) {
	const { data: session } = useSession() as { data: CustomSession | null };
	const dateIos = toVnISOString(date);
	
	return useQuery({
		queryKey: ["findAllAppointmentRequestByDate", dateIos],
		queryFn: async () => {
			const res = await axios.get<AppointmentRequest[]>(
				FIND_ALL_APPOINTMENT_REQUEST_BY_DATE(dateIos),
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
		enabled: !!session?.access_token,
	});
}
