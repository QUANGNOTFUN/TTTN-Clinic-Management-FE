import { useState, useEffect } from "react";
import axios from "axios";
import { Patient } from "@/models/patient";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export function useGetPatient() {
	const { data: session } = useSession();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	
	useEffect(() => {
		const fetchPatient = async () => {
			if (!session?.user?.accessToken) {
				setLoading(false);
				toast.error("Không có token trong session");
				return;
			}
			
			try {
				setLoading(true);
				setError(null);
				
				const res = await axios.get<Patient>(
					`${process.env.NEXT_PUBLIC_API_URL}patients/findOne`,
					{
						headers: {
							Authorization: `Bearer ${session?.user?.accessToken}`,
						},
					}
				);
				
				setPatient(res.data);
			} catch (err) {
				setError(err.response?.data?.message || err.message || "Lỗi không xác định");
			} finally {
				setLoading(false);
			}
		};
		
		fetchPatient();
	}, [session]);
	
	return { patient, loading, error };
}
