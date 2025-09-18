import {CustomSession} from "@/types/login";
import { useSession } from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {DELETE_DOCTOR_SCHEDULE} from "@/lib/api/doctor-schedule";
import {toast} from "react-toastify";

export function useDeleteDoctorSchedule() {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useMutation({
		mutationKey: ["deleteDoctorSchedule"],
		mutationFn: async (scheduleId: string) => {
			const res = await axios.delete(
				DELETE_DOCTOR_SCHEDULE(scheduleId),
				{
					headers: {
						Authorization: `Bearer ${session?.access_token}`,
					},
				}
			);
			
			return res.data;
		},
		onSuccess: () => {
			toast.success("Xóa lịch hẹn thành công", { toastId: "delete-doctor-schedule-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error?.message, { toastId: "delete-doctor-schedule-error" });
		}
	})
}