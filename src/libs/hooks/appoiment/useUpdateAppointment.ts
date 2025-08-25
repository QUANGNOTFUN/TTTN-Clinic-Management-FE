import { useMutation } from "@apollo/client";
import { UPDATE_APPOINTMENT } from "@/libs/graphqls/appointment";

export function useUpdateAppointment() {
    const [UpdateAppointment, { loading, error }] = useMutation(UPDATE_APPOINTMENT);

    const update = async (input: { appointment_id: number; status?: string; is_done?:boolean }) => {
        await UpdateAppointment({
            variables: {
                input,
            },
        });
    };

    return { update, loading, error };
}
