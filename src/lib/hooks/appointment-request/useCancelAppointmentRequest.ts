import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/login";
import {CANCEL_APPOINTMENT_REQUEST} from "@/lib/api/appointment-request";

export function useCancelAppointmentRequest() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useMutation({
		mutationKey: ["cancelAppointmentRequest"],
		mutationFn: async (id: string) => {
			if (!session?.access_token) throw new Error("User must be authenticated");
			
			const res = await axios.put(
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
	});
}
