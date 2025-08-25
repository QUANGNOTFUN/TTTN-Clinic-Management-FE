// hooks/useBookingForm.ts
import React, { useState, useEffect } from 'react';

export const useBookingForm = (user?: any, patient?: any) => {
    const [form, setForm] = useState({
        fullName: '',
        gender: '',
        dob: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        symptoms: '',
    });

    useEffect(() => {
        if (user) {
            setForm({
                fullName: user.full_name || '',
                gender: patient.gender || 'OTHER',
                dob: user.date_of_birth?.slice(0, 10) || '',
                phone: user.phone || '',
                province: '',
                district: '',
                ward: '',
                symptoms: '',
            });
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resetForm = () => {
        setForm({
            fullName: '',
            gender: '',
            dob: '',
            phone: '',
            province: '',
            district: '',
            ward: '',
            symptoms: '',
        });
    };

    return { form, handleChange, resetForm };
};
