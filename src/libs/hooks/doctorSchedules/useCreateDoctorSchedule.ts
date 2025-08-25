import {useMutation} from "@apollo/client";
import {CreateDoctorScheduleData} from "@/types/doctorSchedule";
import {CREATE_DOCTOR_SCHEDULE} from "@/libs/graphqls/doctorSchedule";

export function useCreateDoctorSchedule() {
	const [create, { data, loading, error }] = useMutation<boolean, { input: CreateDoctorScheduleData }>(
		CREATE_DOCTOR_SCHEDULE
	);
	
	const createSchedule = (input: CreateDoctorScheduleData) => create({ variables: { input } });
	
	return {
		create: createSchedule,
		data: data,
		loading,
		error,
	};
}