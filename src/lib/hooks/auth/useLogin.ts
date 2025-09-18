import {signIn} from "next-auth/react"
import {useMutation} from "@tanstack/react-query"
import {LoginPayload} from "@/types/login"

export function useLogin() {
	return useMutation({
		mutationFn: async (payload: LoginPayload) => {
			const res = await signIn("credentials", {
				redirect: true,
				email: payload.email,
				password: payload.password,
			})
			
			if (res?.error) {
				throw new Error(res.error)
			}
			
			return res;
		},
	})
}
