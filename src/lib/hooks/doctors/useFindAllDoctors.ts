import {CustomSession} from "@/types/login";
import { useQuery } from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import axios from "axios";
import {Doctor} from "@/types/doctor";
import {FIND_ALL_DOCTORS_API_URL} from "@/lib/api/doctor";

export function useFindAllDoctors() {
	const { data: sessions } = useSession() as { data: CustomSession };
	
	return useQuery({
		queryKey: ["doctors"],
		queryFn: async () => {
			const res = await axios.get<Doctor[]>(
				FIND_ALL_DOCTORS_API_URL,
				{
					headers: {
						Authorization: `Bearer ${sessions?.access_token}`,
					},
				}
			)
			return res.data;
		},
		enabled: !!sessions?.access_token,
	});
}