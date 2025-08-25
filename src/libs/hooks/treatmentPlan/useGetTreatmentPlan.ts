import { useQuery } from "@apollo/client";
import { GET_PATIENT_PLAN } from "@/libs/graphqls/treatmentPlan";

export function useGetTreatmentPlan(patient_id: string) {
    const { data, loading, error, refetch } = useQuery(GET_PATIENT_PLAN, {
        skip: true, // Không fetch tự động
    });

    return {
        patient: data?.getPatientById,
        plan: data?.getPatientById?.plan,
        loading,
        error,
        refetchById: (id: string) => refetch({ id }),
    };
}

