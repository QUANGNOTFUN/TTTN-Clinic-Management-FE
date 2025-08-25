import { Reference, StoreObject, useMutation } from "@apollo/client";
import { DELETE_DOCTOR } from "@/libs/graphqls/doctors";
import { Doctor } from "@/types/doctors";

export function useDeleteDoctor() {
    const [deleteDoctor, { data, loading, error }] = useMutation<
        { doctor: Doctor },
        { id: string }
    >(DELETE_DOCTOR, {
        update(cache, { data }) {
            if (data?.doctor) {
                cache.modify({
                    fields: {
                        doctors(existingDoctors = [], { readField }) {
                            return existingDoctors.filter(
                                (doc: Reference | StoreObject | undefined) =>
                                    readField('id', doc) !== data.doctor.id
                            );
                        },
                    },
                });
            }
        },
    });

    const deleteFn = (id: string) =>
        deleteDoctor({ variables: { id } });

    return {
        delete: deleteFn,
        data: data?.doctor ?? null,
        loading,
        error,
    };
}