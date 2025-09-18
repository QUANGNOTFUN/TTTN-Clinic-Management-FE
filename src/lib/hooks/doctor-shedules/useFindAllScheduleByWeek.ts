import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {DoctorSchedule} from "@/types/doctor-schedule";
import {FIND_ALL_BY_WEEK_API_URL} from "@/lib/api/doctor-schedule";
import {CustomSession} from "@/types/login";

export function useFindAllScheduleByWeek(date: Date) {
  const { data: session } = useSession() as { data: CustomSession };
  const formattedDate = date.toISOString();
  
  return useQuery({
    queryKey: ["findAllByWeek", formattedDate],
    queryFn: async () => {
      const res = await axios.get<DoctorSchedule[]>(
          FIND_ALL_BY_WEEK_API_URL(formattedDate),
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
  });
}