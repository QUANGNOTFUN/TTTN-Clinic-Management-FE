import {useMutation} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import {CREATE_DOCTOR_SCHEDULE} from "@/lib/api/doctor-schedule";
import {CustomSession} from "@/types/login";
import {useSession} from "next-auth/react";
import {CreateDoctorScheduleDto} from "@/types/doctor-schedule";
import {toast} from "react-toastify";

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
				    Authorization: `Bearer ${session?.access_token}`,
				    'Content-Type': 'application/json',
			    },
	    });
			
	    return res.data;
        },
		onSuccess: () => {
			toast.success("Tạo lịch hẹn thành công", { toastId: "create-doctor-schedule-success" });
		},
		onError: (error: AxiosError) => {
			toast.error(error.message, { toastId: "create-doctor-schedule-error" });
		},
    });
};