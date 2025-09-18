"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {FIND_ALL_PATIENTS} from "@/lib/api/patient";
import {useSession} from "next-auth/react";
import {CustomSession} from "@/types/login";
import {Patient} from "@/types/patient";

export function useFindAllPatients() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useQuery({
		queryKey: ["patients"], // cache key
		queryFn: async () => {
			if (!session?.access_token) throw new Error("Not authenticated");
			
			const res = await axios.get<Patient[]>(FIND_ALL_PATIENTS, {
				headers: {
					Authorization: `Bearer ${session?.access_token}`,
				},
			});
			return res.data;
		},
	});
}
