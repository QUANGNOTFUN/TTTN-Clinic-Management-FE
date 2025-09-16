import {useSession} from "next-auth/react";
import {FIND_ALL_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CustomSession} from "@/types/login";
import {Appointment} from "@/types/appointment-request";


export function useFindAllAppointmentRequest() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useQuery<Appointment[], Error>({
		queryKey: ["findAllAppointmentRequest"],
		queryFn: async () => {
			if (!session?.user) throw new Error("Not authenticated");
			
			const res = await axios.get(
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
