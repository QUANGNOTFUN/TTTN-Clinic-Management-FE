'use client'

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Patient} from "@/types/patient";
import {useSession} from "next-auth/react";
import {FIND_ONE_PATIENT} from "@/lib/api/patient";
import {CustomSession} from "@/types/login";


export function useFindOnePatient() {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useQuery({
		queryKey: ["patient", session?.user.email], // key gắn với user
		queryFn: async () => {
			const res = await axios.get<Patient>(
				FIND_ONE_PATIENT,
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			return res.data;
		},
		enabled: !!session?.access_token,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
}
