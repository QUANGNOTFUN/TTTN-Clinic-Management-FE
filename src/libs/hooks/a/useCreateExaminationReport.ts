import { useMutation } from "@apollo/client";
import {MedicalExaminationInput} from "@/types/examination_report";
import {CREATE_EXAMINATION} from "@/libs/graphqls/examinationreport";


export function useCreateExamination() {
    const [makeMedicalExamination, { data, loading, error }] = useMutation<
        { makeMedicalExamination: boolean },
        { input: MedicalExaminationInput }
    >(CREATE_EXAMINATION);

    const create = async (input: MedicalExaminationInput) => {
        const response = await makeMedicalExamination({ variables: { input } });
        return response.data?.makeMedicalExamination ?? false;
    };

    return {
        create,
        loading,
        error,
        data,
    };
}
