import { gql } from "@apollo/client";
import {DeleteAppointmentInput} from "@/types/appointment";

export const GET_APPOINTMENTS = gql`
    query GetAppointments($input: PaginationAppointmentInput!) {
        getAppointmentsByDoctor(input: $input) {
            items {
                appointment_id
                patient {
                    patient_id
                    gender
                    plan_id
                    user {
                        full_name
                        email
                        phone
                        address
                        avatar
                        date_of_birth
                        created_at
                        updated_at
                    }
                }
                slot_id
                appointment_type
                appointment_date
                status
                is_anonymous
                notes
            }
            total
            page
            pageSize
            totalPages
        }
    }
`;

export const SEARCH_APPOINTMENTS = gql`
    query SearchAppointments($input: SearchAppointmentsInput!) {
        searchAppointments(input: $input) {
            id
            patient_id
            doctor_id
            slot_id
            appointment_type
            appointment_date
            status
            is_anonymous
        }
    }
`;
export const GET_APPOINTMENT = gql`
    query GetAppointment($id: Int!) {
        appointment(id: $id) {
            id
            patient_id
            doctor_id
            slot_id
            appointment_type
            appointment_date
            status
            is_anonymous
        }
    }
`;

export const GET_APPOINTMENT_BY_DATE = gql`
    query GetAppointment($id: Int!) {
        appointment(id: $id) {
            id
            patient_id
            doctor_id
            slot_id
            appointment_type
            appointment_date
            status
            is_anonymous
        }
    }
`;
export const CREATE_APPOINTMENT = gql`
    mutation CreateAppointment($input: CreateAppointmentInput!) {
        createAppointment(input: $input) {
            id
            patient_id
            doctor_id
            slot_id
            appointment_type
            appointment_date
            status
            is_anonymous
        }
    }
`;

export const UPDATE_APPOINTMENT = gql`
    mutation UpdateAppointment($input: UpdateAppointmentInput!) {
        updateAppointment(input: $input)
    }
`;

export const DELETE_APPOINTMENT = gql`
    mutation DeleteAppointment($input: DeleteAppointmentInput!) {
        deleteAppointment(input: $input)
    }
`;
