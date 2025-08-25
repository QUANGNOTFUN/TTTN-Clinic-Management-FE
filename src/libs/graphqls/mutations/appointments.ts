import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      doctor_id
      patient_id
      status
      appointment_type
      slot_id
      notes
    }
  }
`;

export const UPDATE_APPOINTMENT_STATUS = gql`
  mutation UpdateAppointmentStatus($appointmentId: Int!, $newStatus: String!) {
    updateAppointmentStatus(appointmentId: $appointmentId, newStatus: $newStatus) {
      appointment_id
      status
    }
  }
`;
