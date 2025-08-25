import { Reference, StoreObject, useMutation } from "@apollo/client";
import { UPDATE_DOCTOR } from "@/libs/graphqls/doctors";
import {UpdateDoctorInput} from "@/types/doctors";

export interface UpdateDoctorResponse {
	updateDoctor: {
		id: string;
		user: {
			id: string;
			email?: string | null;
			full_name?: string  | null;
			gender?: "MALE" | "FEMALE" | "OTHER" | null;
		};
		qualifications?: string | null;
		work_seniority?: number | null;
		specialty?: string | null;
		hospital?: string | null;
	};
}

export function useUpdateDoctor() {
	const [updateDoctor, { data, loading, error }] = useMutation<
		UpdateDoctorResponse,
		{ id: string; doctorData: UpdateDoctorInput }
	>(UPDATE_DOCTOR, {
		update(cache, { data }) {
			if (data?.updateDoctor) {
				cache.modify({
					fields: {
						doctors(existingDoctors = [], { readField }) {
							return existingDoctors.map(
								(doctor: Reference | StoreObject | undefined) =>
									readField("id", doctor) === data.updateDoctor.id
										? data.updateDoctor
										: doctor
							);
						},
					},
				});
			}
		},
	});

	const update = (id: string, doctorData: UpdateDoctorInput) =>
		updateDoctor({ variables: { id, doctorData } });

	return {
		update,
		data: data?.updateDoctor ?? null,
		loading,
		error,
	};
}
