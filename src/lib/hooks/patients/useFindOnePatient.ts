import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Patient } from "@/types/patient";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {FIND_ONE_PATIENT} from "@/lib/api/patient";
import {CustomSession} from "@/types/login";

async function fetchPatient(accessToken: string): Promise<Patient> {
	const res = await axios.get<Patient>(
		FIND_ONE_PATIENT,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return res.data;
}

export function useFindOnePatient() {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useQuery<Patient, Error>({
		queryKey: ["patient", session?.user.email], // key gắn với user
		queryFn: async () => {
			if (!session?.user?.accessToken) {
				toast.error("Không có token trong session");
				throw new Error("Missing access token");
			}
			return fetchPatient(session.user.accessToken);
		},
		enabled: !!session?.user?.accessToken, // chỉ chạy khi có token
		retry: false, // nếu muốn không retry khi lỗi auth
		staleTime: 5 * 60 * 1000, // cache 5 phút
	});
}
