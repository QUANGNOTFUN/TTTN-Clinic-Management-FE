import {Appointment, CreateAppointmentInput} from "@/types/appointment";
import {useMutation} from "@apollo/client";
import {CREATE_APPOINTMENT} from "@/libs/graphqls/appointment";

export function useCreateAppointment() {
    const [createAppointment, { data, loading, error }] = useMutation<
    {appointment: Appointment},
    {input : CreateAppointmentInput}
    >(CREATE_APPOINTMENT)

    const create = (input: CreateAppointmentInput) =>
        createAppointment({variables: {input}});

    return {
        create,
        data: data?.appointment ?? null,
        loading,
        error
    }
}