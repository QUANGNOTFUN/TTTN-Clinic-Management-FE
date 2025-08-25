import {useMutation} from "@apollo/client";
import {CREATE_MEDICATION} from "@/libs/graphqls/medications";
import {CreateMedicationInput, Medication} from "@/types/medications";

export function useCreateMedication() {
	const [createMedication, { data, loading, error }] = useMutation<
		{ medication: Medication },
		{ input: CreateMedicationInput }
	>(CREATE_MEDICATION);

	const create = (input: CreateMedicationInput) =>
		createMedication({variables: {input}});

	return {
		create,
		data: data?.medication ?? null,
		loading,
		error
	}
}