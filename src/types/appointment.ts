import {Patient} from "@/types/patient";

export interface Appointment {
    appointment_id: number;
    patient_id: string;
    doctor_id: number;
    slot_id: number;
    appointment_type: string;
    appointment_date: Date;
    status: string;
    is_done?: boolean;
    is_anonymous: boolean;
    notes: string;
    patient:Patient;
}

export interface PaginationAppointmentInput{
    doctor_id: string;
    page: number;
    pageSize: number;
}


export interface PaginatedAppointment {
    items: Appointment[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}


export interface CreateAppointmentInput {
    doctor_id: string;
    schedule_id: string;
    appointment_id: string;
    appointment_type: string;
    is_anonymous: boolean;
}

export interface UpdateAppointmentInput {
    appointment_id: number;
    appointment_type?: string;
    appointment_date?: string;
    status?: string;
    is_done?: boolean;
}

export class DeleteAppointmentInput {
    appointment_id: number;
}


