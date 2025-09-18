import {useMutation} from "@tanstack/react-query";
import {UpdateDoctorDto} from "@/types/doctor";
import axios, {AxiosError} from "axios";
import {UPDATE_DOCTOR_API_URL} from "@/lib/api/doctor";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/types/login";
import {toast} from "react-toastify";

export function useUpdateDoctor() {
	const { data: session } = useSession() as { data: CustomSession | null };
	
	return useMutation({
		mutationKey: ["updateDoctor"],
		mutationFn: async ({ id, payload }: {
			id: string;
			payload: UpdateDoctorDto;
		}) => {
			if (!session?.access_token) throw new Error("Not authenticated");
			
			const res = await axios.put(
				UPDATE_DOCTOR_API_URL(id),
				payload, {
				headers: {
					Authorization: `Bearer ${session?.access_token}`,
				},
			});
			
			return res.data;
		},
		onSuccess: () => {
			toast.success("Cập nhật bác sĩ thành công", {
				toastId: "update-doctor-success",
			});
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message || "Có lỗi xảy ra", {
				toastId: "update-doctor-error",
			});
		},
	});
}