import {useSession} from "next-auth/react";
import {AppointmentRequest} from "@/types/appointment-request";
import {FIND_ALL_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CustomSession} from "@/types/login";


export function useFindAllAppointmentRequest() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useQuery<AppointmentRequest[], Error>({
		queryKey: ["findAllAppointmentRequest"],
		queryFn: async () => {
			if (!session?.user) throw new Error("Not authenticated");
			
			const res = await axios.get<AppointmentRequest[]>(
				FIND_ALL_APPOINTMENT_REQUEST,
				{
					headers: {
						Authorization: `Bearer ${session.user.accessToken}`,
					},
				}
			);
			
			return res.data;
		},
		enabled: !!session?.user,
	});
}
