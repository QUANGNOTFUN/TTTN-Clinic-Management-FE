import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FIND_ALL_SERVICES_API_URL } from "@/lib/api/clinic-service";
import { ClinicService } from "@/types/clinic-service";
import { CustomSession } from "@/types/login";
import {useSession} from "next-auth/react";

export function useFindAllClinicServices() {
	const { data: sessions } = useSession() as { data: CustomSession };
	
	return useQuery<ClinicService[]>({
		queryKey: ["clinicServices"],
		queryFn: async () => {
			const { data } = await axios.get<ClinicService[]>(FIND_ALL_SERVICES_API_URL);
			return data;
		},
		staleTime: 5 * 60 * 1000, // cache trong 5 phút -> giảm số lần call API
		refetchOnWindowFocus: false, // không refetch khi đổi tab -> UX mượt hơn
		retry: 1, // chỉ retry 1 lần nếu lỗi
		enabled: !!sessions?.access_token,
	});
}
