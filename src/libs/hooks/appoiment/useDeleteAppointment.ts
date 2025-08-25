import { useMutation } from "@apollo/client";
import { DELETE_APPOINTMENT } from "@/libs/graphqls/appointment";

export function useDeleteAppointment() {
    const [deleteAppointment, { data, loading, error }] = useMutation<
        { deleteAppointment: boolean },
        { input: { appointment_id: number } }
    >(DELETE_APPOINTMENT);

    const remove = (id: number) =>
        deleteAppointment({ variables: { input: { appointment_id: id } } });

    return {
        delete: remove,
        data: data?.deleteAppointment ?? null,
        loading,
        error,
    };
}
