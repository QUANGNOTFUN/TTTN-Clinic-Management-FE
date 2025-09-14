import {useMutation} from "@tanstack/react-query";
import {RegisterPayload} from "@/types/register";
import axios from "axios";
import {REGISTER_API_URL} from "@/lib/api/auth";

export function useRegister() {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: async (payload: RegisterPayload) => {
			const res = await axios.post(REGISTER_API_URL, payload);
			return res.data;
		}
	})
}