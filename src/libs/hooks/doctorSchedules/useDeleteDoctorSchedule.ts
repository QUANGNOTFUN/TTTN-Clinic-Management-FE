import {useMutation} from "@apollo/client";
import {DELETE_DOCTOR_SCHEDULE} from "@/libs/graphqls/doctorSchedule";

export function useDeleteDoctorSchedule() {
	const [deleteDoctorSchedule, { data, loading, error }] = useMutation<boolean, { schedule_id: number }>(DELETE_DOCTOR_SCHEDULE)
	
	const remove = (schedule_id: number) => {
		return deleteDoctorSchedule({ variables: { schedule_id } });
	};
	
	return {
		delete: remove,
		data: data ?? false,
		loading,
		error,
	};
}