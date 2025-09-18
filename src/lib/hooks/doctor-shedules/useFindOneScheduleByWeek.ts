import {CustomSession} from "@/types/login";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {DoctorSchedule} from "@/types/doctor-schedule";
import axios from "axios";
import {FIND_ONE_BY_WEEK_API_URL} from "@/lib/api/doctor-schedule";

export function useFindOneScheduleByWeek(id: string, date: Date) {
	const { data: session } = useSession() as { data: CustomSession };
	const formattedDate = date.toISOString();
	
	return useQuery({
		queryKey: ["findOneScheduleByWeek", id, formattedDate],
		queryFn: async () => {
			const res = await axios.get<DoctorSchedule[]>(
				FIND_ONE_BY_WEEK_API_URL(id, formattedDate),
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			
			return res.data;
		},
		refetchOnWindowFocus: false,
		retry: 1,
		enabled: !!session?.access_token,
	})
}