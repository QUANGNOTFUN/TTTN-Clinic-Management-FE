import { useQuery } from "@apollo/client";
import { Doctor, DoctorDisplay } from "@/types/doctors";
import { GET_DOCTORS } from "@/libs/graphqls/doctors";

export function useGetDoctors() {
	const { data, loading, error, refetch } = useQuery<{ doctors: Doctor[] }>(GET_DOCTORS);
	
	// Chuyển đổi Doctor sang DoctorDisplay
	const doctorsDisplay: DoctorDisplay[] = data?.doctors
		? data.doctors.map((doctor) => ({
			id: doctor.id || null,
			email: doctor.user?.email || "",
			full_name: doctor.user?.full_name || "",
			phone: doctor.user?.phone || "",
			address: doctor.user?.address || "",
			avatar: doctor.user?.avatar || "",
			date_of_birth: doctor.user?.date_of_birth || "",
			qualifications: doctor.qualifications || null,
			work_seniority: doctor.work_seniority || null,
			gender: doctor.gender || null,
			specialty: doctor.specialty || null,
			hospital: doctor.hospital || null,
		}))
		: [];
	
	return {
		doctors: doctorsDisplay,
		loading,
		error,
		refetch,
	};
}