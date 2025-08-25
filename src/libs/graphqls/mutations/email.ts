import { gql } from '@apollo/client';

export const SEND_APPOINTMENT_EMAIL = gql`
  mutation sendAppointmentEmail($appointmentId: Int!) {
    sendAppointmentEmail(appointmentId: $appointmentId)
  }
`;
