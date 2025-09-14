import { useMutation } from "@apollo/client";
import { RegisterDoctorInput } from "@/types/register";
import { CREATE_DOCTOR } from "@/libs/graphqls/doctors";

type CreateDoctorResult = {
	createDoctor: boolean;
};

export function useRegisterDoctor() {
	const [mutate, { loading, error }] = useMutation<CreateDoctorResult>(CREATE_DOCTOR);

	const register = async (input: RegisterDoctorInput): Promise<boolean> => {
		try {
			const result = await mutate({ variables: { doctorData: input } });
			return result.data?.createDoctor ?? false;
		} catch (e) {
			console.error(e);
			return false;
		}
	};

	return {
		register,
		loading,
		error,
	};
}
