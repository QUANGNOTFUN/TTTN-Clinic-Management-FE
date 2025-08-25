// hooks/useProfileData.ts
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { GET_PATIENT_BY_ID, UPDATE_PATIENT_BY_ID } from "@/libs/graphqls/queries/profile";

export function useProfileData() {
    const { data: session } = useSession();
    const patientId = session?.user?.id;

    const { data, loading, error, refetch } = useQuery(GET_PATIENT_BY_ID, {
        variables: { input: { patient_id: patientId } },
        skip: !patientId,
    });

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        full_name: "",
        date_of_birth: "",
        address: "",
        gender: "",
        phone: "",
    });

    const [updatePatient, { loading: updating }] = useMutation(UPDATE_PATIENT_BY_ID, {
        onCompleted: () => {
            alert("Cập nhật thành công!");
            setEditMode(false);
            refetch();
        },
        onError: (err) => {
            alert(`Cập nhật thất bại: ${err.message}`);
        },
    });

    const patient = data?.findOnePatient;
    const user = patient?.user;

    useEffect(() => {
        if (user && patient) {
            setForm({
                full_name: user.full_name || "",
                date_of_birth: user.date_of_birth?.slice(0, 10) || "",
                address: user.address || "",
                gender: patient.gender || "",
                phone: user.phone || "",
            });
        }
    }, [user, patient]);

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updatePatient({
            variables: {
                input: {
                    patient_id: patientId,
                    gender: form.gender,
                    user: {
                        full_name: form.full_name,
                        date_of_birth: form.date_of_birth,
                        address: form.address,
                        phone: form.phone,
                    },
                },
            },
        });
    };

    return {
        form,
        editMode,
        loading,
        error,
        updating,
        user,
        patient,
        setEditMode,
        handleInputChange,
        handleSubmit,
        setForm,
    };
}
