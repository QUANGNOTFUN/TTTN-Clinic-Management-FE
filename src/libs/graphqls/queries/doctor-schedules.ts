import { gql } from '@apollo/client';

export const GET_SCHEDULES_BY_DATE = gql`
  query GetDoctorSchedulesIdByDate($doctor_id: String!, $date: String!) {
    getDoctorSchedulesIdByDate(doctor_id: $doctor_id, date: $date) {
      id
      start_time
      end_time
    }
  }
`;

export const GET_SCHEDULE_DATES = gql`
  query GetAvailableScheduleDates($doctor_id: String!) {
    getAvailableScheduleDates(doctor_id: $doctor_id)
  }
`;
