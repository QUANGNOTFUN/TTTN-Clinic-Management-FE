import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import {LoginPayload} from "@/types/login";

export function useLogin() {
	const [loading, setLoading] = useState(false);
	
	const login = async (payload: LoginPayload) => {
		setLoading(true);
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email: payload.email,
				password: payload.password,
			});
			
			if (res?.error) {
				toast.error("Đăng nhập thất bại: " + res.error, { toastId: "login-error" });
				return { success: false, error: res.error };
			}
			
			toast.success("Đăng nhập thành công!", { toastId: "login-success" });
			return { success: true };
		} catch (e) {
			console.error(e);
			toast.error("Có lỗi xảy ra!", { toastId: "login-exception" });
			return { success: false, error: "Exception" };
		} finally {
			setLoading(false);
		}
	};
	
	return { login, loading };
}
