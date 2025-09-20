"use client";

import {useFindOnePatient} from "@/lib/hooks/patients/useFindOnePatient";
import {VscLoading} from "react-icons/vsc";
import {useSession} from "next-auth/react";
import {CustomSession} from "@/types/login";
import {Button} from "@/components/ui/button";
import {Edit3Icon, ImageUpIcon} from "lucide-react";
import {useState} from "react";
import {ProfileUpdateForm} from "@/app/(user)/profile/_component/ProfileUpdateForm";
import {useUpdatePatient} from "@/lib/hooks/patients/useUpdatePatient";
import {useUpdatePatientImage} from "@/lib/hooks/image/useUpdatePatientImage";
import {GenericUpdateImageForm} from "@/app/(admin)/_components/mocules/GenericUpdateImageForm";
import {GET_IMAGE_API} from "@/lib/api/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function ProfilePage() {
    const { data: session } = useSession() as { data: CustomSession };
    const { data, isLoading, isError, error, refetch } = useFindOnePatient();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isUpload, setIsUpload] = useState<boolean>(false);
    const { mutateAsync: updatePatient } = useUpdatePatient();
    const { mutateAsync: uploadImage, isPending } = useUpdatePatientImage();
    
    const translateGender = (gender?: string | null) => {
        switch (gender?.toUpperCase()) {
            case "MALE":
                return "Nam";
            case "FEMALE":
                return "Nữ";
            case "UNKNOWN":
                return "Chưa cập nhật";
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
                { label: "Họ và tên", value: data?.full_name || "N/A" },
                { label: "Ngày sinh", value: formatDate(data?.date_of_birth) },
                { label: "Giới tính", value: translateGender(data?.gender) },
                { label: "Số điện thoại", value: data?.phone_number || "N/A" },
                { label: "Địa chỉ", value: data?.address || "N/A" },
            ],
        },
        {
            title: "Thông tin y tế",
            fields: [
                { label: "Nhóm máu", value: data?.blood_type || "N/A" },
                { label: "Tiền sử bệnh", value: data?.medical_history || "N/A" },
                { label: "Số điện thoại khẩn cấp", value: data?.emergency_contact || "N/A" },
                { label: "Số bảo hiểm", value: data?.insurance_number || "N/A" },
            ],
        },
    ];
    if (isEdit) {
        return (
            <ProfileUpdateForm
                open={isEdit}
                onOpenChange={setIsEdit}
                patient={data}
                onSubmit={(data) =>
                    updatePatient({id: session.user.id, payload: data})
                        .finally(() => refetch())
            }
            />
        );
    }
    if (isUpload) {
        return (
            <GenericUpdateImageForm
                entityId={session.user.id}
                entityName={data?.full_name || "N/A"}
                isPending={isPending}
                onClose={() => setIsUpload(false)}
                onUpdate={(data) => {
                    uploadImage({patientId: session.user.id, image: data.image}).then(() => refetch())
                }}
            />
        )
    }
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-zinc-100">
                <VscLoading className="animate-spin text-black text-[50px]" />
            </div>
        );
    }
    
    if (isError) {
        return (
            <div className="p-6 text-red-600">
                <p>Lỗi: {error.message}</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen pt-14 p-6 bg-gradient-to-b from-gray-50 to-gray-100 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="relative flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden  border-gray-200 shadow-md">
                        <Avatar className="w-full h-full border shadow-sm">
                            <AvatarImage
                                src={
                                    data?.avatar_url
                                        ? GET_IMAGE_API(data?.avatar_url)
                                        : "/default-avatar.png"
                                }
                                className="w-full h-full object-cover rounded-full"
                                alt="Avatar"
                            />
                            <AvatarFallback className="text-2xl flex items-center justify-center w-full h-full">
                                {data?.full_name?.charAt(0) ?? "?"}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    
                    {/* Name and email */}
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-3xl md:text-2xl font-bold text-gray-800">
                            {session?.user.email || "Chưa cập nhật tên"}
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base">
                            {"User_Id: " + data?.user_id || "Chưa cập nhật email"}
                        </p>
                    </div>
                    
                    {/* Upload button */}
                    <Button
                        onClick={() => setIsUpload(!isEdit)}
                        className="absolute top-13 right-2 cursor-pointer bg-emerald-300 hover:bg-emerald-600 text-zinc-700 hover:text-zinc-50"
                    >
                        <ImageUpIcon />
                        <span>Cập nhật ảnh</span>
                    </Button>
                    
                    {/* Edit button */}
                    <Button
                        onClick={() => setIsEdit(!isEdit)}
                        className="absolute top-2 right-2 cursor-pointer bg-emerald-300 hover:bg-emerald-600 text-zinc-700 hover:text-zinc-50"
                    >
                        <Edit3Icon />
                        <span>Cập nhật</span>
                    </Button>
                </div>
                
                {/* Sections */}
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow">
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
