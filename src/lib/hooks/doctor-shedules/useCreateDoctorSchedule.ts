import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {CREATE_DOCTOR_SCHEDULE} from "@/lib/api/doctor-schedule";
import {CustomSession} from "@/types/login";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import { CreateDoctorScheduleDto } from '@/app/(admin)/schedule-manage/_components/createScheduleForm/CreateScheduleForm';

export const useCreateDoctorSchedule = () => {
	const { data: session } = useSession() as { data: CustomSession };
	
	return useMutation({
		mutationKey: ['createDoctorSchedule'],
		mutationFn: async (payload: CreateDoctorScheduleDto) => {
			if (!session?.access_token) throw new Error("Not authenticated");
			
			const res = await axios.post(
				CREATE_DOCTOR_SCHEDULE, payload,
				{
		        headers: {
				    Authorization: `Bearer ${session?.access_token}`
			    },
	    });
			
	    return res.data;
        },
		retry: 1,
		onSuccess: () => {
			toast.success("Tạo lịch hẹn thành công", { toastId: "create-doctor-schedule-success" });
		},
		onError: (error: AxiosError<any>) => {
			// Lấy message từ API
			const apiMessage = error.response?.data?.message;
			
			let displayMessage = "Có lỗi xảy ra";
			if (Array.isArray(apiMessage)) {
				displayMessage = apiMessage.join(", "); // gộp các message trong mảng
			} else if (typeof apiMessage === "string") {
				displayMessage = apiMessage;
			} else {
				displayMessage = error.message; // fallback
			}
			
			toast.error(displayMessage, { toastId: "create-doctor-schedule-error" });
		}
		
	});
};