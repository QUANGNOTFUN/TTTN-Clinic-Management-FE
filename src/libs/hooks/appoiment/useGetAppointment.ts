import { useQuery } from "@apollo/client";
import { GET_APPOINTMENTS } from "@/libs/graphqls/appointment";
import { PaginatedAppointment } from "@/types/appointment";

export function useGetAppointments(input: { doctor_id: string, page: number; pageSize: number }) {
    const { data, loading, error, refetch } = useQuery<{ getAppointmentsByDoctor: PaginatedAppointment }>(
        GET_APPOINTMENTS,
        {
            variables: { input },
            fetchPolicy: "cache-and-network",
        }
    );

    return {
        appointments: data?.getAppointmentsByDoctor.items || [],
        total: data?.getAppointmentsByDoctor.total || 0,
        page: data?.getAppointmentsByDoctor.page || 1,
        pageSize: data?.getAppointmentsByDoctor.pageSize || 10,
        totalPages: data?.getAppointmentsByDoctor.totalPages || 1,
        loading,
        error,
        refetch,
    };
}

