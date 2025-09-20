import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {CustomSession} from "@/types/login";
import {FIND_ALL_APPOINTMENT_BY_ID_API_URL} from "@/lib/api/appointment-queue";
import {Appointment} from "@/types/appointment";

export function useFindAllAppointmentById() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useQuery({
		queryKey: ["useFindAllAppointmentById", session?.user.id],
		queryFn: async () => {
			const res = await axios.get<Appointment[]>(
				FIND_ALL_APPOINTMENT_BY_ID_API_URL(session?.user.id),
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
		enabled: !!session?.access_token && !!session?.user.id,
	});
}
