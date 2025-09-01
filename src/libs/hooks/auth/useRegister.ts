import {useState} from "react";
import {RegisterPayload} from "@/models/register";
import axios from "axios";

export function useRegister() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	
	const register = async (payload: RegisterPayload) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}auth/register`,
				payload
			);
			setSuccess(true);
			return res.data;
		} catch (e) {
			const msg = e.response?.data?.message || e.message || "Đăng kí thất bại";
			setError(msg);
			throw e;
		} finally {
			setLoading(false);
		}
	};
	
	return { register, loading, error, success };
}