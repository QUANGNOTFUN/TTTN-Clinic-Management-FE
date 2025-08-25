import {HeaderDoctorTable} from "@/app/(doctor)/_components/Layout/DoctorTable";

export const HEADER_APPOINMENTS_TABLE: HeaderDoctorTable[] = [
    { label: "ID", key: "appointment_id", type: "text" },
    { label: "Người hẹn", key: "patient.user.full_name", type: "text" },
    { label: "Ca", key: "slot_id", type: "text" },
    { label: "Loại lịch hẹn", key: "appointment_type", type: "text" },
    { label: "Giờ hẹn", key: "appointment_date", type: "date" },
    { label: "Trạng thái", key: "status", type: "text" },
    { label: "Hành động", key: "action", type: "text" },
];


