import {HeaderDoctorTable} from "@/app/(doctor)/_components/Layout/DoctorTable";

export const INIT_PATIENT_TABLE: HeaderDoctorTable[] = [
    { label: "ID", key: "appointment_id", type: "text" },
    { label: "Tên", key: "patient.user.full_name", type: "text" },
    { label: "Tuổi", key: "patient.user.date_of_birth", type: "number" },
    { label: "Giới tính", key: "patient.gender", type: "text" },
    { label: "Lần khám gần nhất", key: "updated_at", type: "date" },
    { label: "Kế hoạch điều trị", key: "patient.plan_id", type: "text" },
    { label: "Hành động", key: "action", type: "text" },
];
