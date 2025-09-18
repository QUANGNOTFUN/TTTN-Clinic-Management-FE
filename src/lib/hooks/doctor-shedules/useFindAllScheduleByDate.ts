import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DoctorSchedule } from "@/types/doctor-schedule";
import { FIND_ALL_BY_DATE } from "@/lib/api/doctor-schedule";
import { CustomSession } from "@/types/login";

export function useFindAllScheduleByDate(date: Date) {
  const { data: session } = useSession() as { data: CustomSession };
  
  return useQuery({
    queryKey: ["findAllByDate", date.toISOString().split("T")[0]],
    queryFn: async () => {
	  const formattedDate = date.toISOString();
      const res = await axios.get<DoctorSchedule[]>(
          FIND_ALL_BY_DATE(formattedDate),
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
      );
      
      return res.data;
    },
    enabled: !!session?.access_token,
  });
}