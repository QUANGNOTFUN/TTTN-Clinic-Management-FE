import {GET_DOCTOR_SCHEDULES_BY_WEEK_DATE} from "@/libs/graphqls/doctorSchedule";
import {DoctorSchedule, WeekDateInput} from "@/types/doctorSchedule";
import {useQuery} from "@apollo/client";

export const useGetDoctorSchedulesByWeekDate = (weekDate: WeekDateInput) => {
	const { data, loading, error, refetch } = useQuery<
		{ getDoctorScheduleByWeekDate: DoctorSchedule[] },
		{ weekDate: WeekDateInput }
	>(GET_DOCTOR_SCHEDULES_BY_WEEK_DATE, {
		variables: { weekDate: weekDate },
		fetchPolicy: "cache-first",
	});
	
	return {
		data: data?.getDoctorScheduleByWeekDate || [],
		loading,
		error,
		refetch,
	};
};