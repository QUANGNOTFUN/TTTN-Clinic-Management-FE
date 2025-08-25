
import { gql } from '@apollo/client';

export const FIND_APPOINTMENT_BY_PATIENT_ID = gql`
  query findAppointmentByPatientId($input: GetAppointmentByPatientIdInput!) {
    findAppointmentByPatientId(input: $input) {
      appointment_id
      doctor_id
      slot_id
      status
      appointment_date
      appointment_type
      doctor {
          id
          user {
            full_name
            avatar
          }
      }
    }
  }
`;
