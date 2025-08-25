import { gql } from '@apollo/client';

export const GET_SLOTS_BY_SCHEDULE = gql`
  query getAppointmentSlotByScheduleId($id: Int!) {
    getAppointmentSlotByScheduleId(id: $id) {
      id
      start_time
      end_time
      max_patients
      booked_count
    }
  }
`;
