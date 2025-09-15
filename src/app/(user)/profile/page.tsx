"use client";

import { useFindOnePatient } from "@/lib/hooks/patients/useFindOnePatient";
import { VscLoading } from "react-icons/vsc";
import Image from "next/image";

export default function ProfilePage() {
    const { patient, loading, error } = useFindOnePatient();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-zinc-100">
                <VscLoading className="animate-spin text-black text-[50px]" />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="p-6 text-red-600">
                <p>Lỗi: {error}</p>
            </div>
        );
    }
    
    const translateGender = (gender?: string | null) => {
        switch (gender?.toUpperCase()) {
            case "MALE":
                return "Nam";
            case "FEMALE":
                return "Nữ";
            case "OTHER":
                return "Khác";
            default:
                return "N/A";
        }
    };
    
    const formatDate = (date?: string | null) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("vi-VN");
    };
    
    // Nhóm dữ liệu thành các section
    const sections = [
        {
            title: "Thông tin cơ bản",
            fields: [
                { label: "Họ và tên", value: patient?.full_name || "N/A" },
                { label: "Ngày sinh", value: formatDate(patient?.date_of_birth) },
                { label: "Giới tính", value: translateGender(patient?.gender) },
                { label: "Số điện thoại", value: patient?.phone_number || "N/A" },
                { label: "Địa chỉ", value: patient?.address || "N/A" },
            ],
        },
        {
            title: "Thông tin y tế",
            fields: [
                { label: "Nhóm máu", value: patient?.blood_type || "N/A" },
                { label: "Tiền sử bệnh", value: patient?.medical_history || "N/A" },
                { label: "Số điện thoại khẩn cấp", value: patient?.emergency_contact || "N/A" },
                { label: "Số bảo hiểm", value: patient?.insurance_number || "N/A" },
            ],
        },
    ];
    
    return (
        <div className="min-h-screen pt-14 p-6 bg-transparent  overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-lg">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                        <Image
                            src="/default-avatar.png"
                            alt="Avatar"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {patient?.full_name || "Chưa cập nhật tên"}
                        </h1>
                    </div>
                </div>
                
                {/* Sections */}
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">{section.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                            {section.fields.map((field, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center py-3 px-2 shadow-sm rounded-lg text-sm md:text-base`
                                    }
                                >
                                    <span className="text-gray-500 font-medium">{field.label}</span>
                                    <span className="font-semibold">{field.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
