import {useEffect, useState} from "react";
import {ClinicServiceResponse} from "@/types/clinic-service";
import axios from "axios";

export function useFindAllClinicServices() {
	const [data, setData] = useState<ClinicServiceResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	
	useEffect(() => {
		axios
			.get<ClinicServiceResponse[]>(`${process.env.NEXT_PUBLIC_API_URL}clinicServices/findAll`)
			.then((res) => setData(res.data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, []);
	
	return { data, loading, error };
}