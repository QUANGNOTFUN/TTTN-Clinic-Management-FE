import { gql } from "@apollo/client";

// Lấy danh sách tất cả lịch bác sĩ
export const GET_DOCTOR_SCHEDULES_BY_WEEK_DATE = gql`
  query GetDoctorScheduleByWeekDate($weekDate: WeekDateInput!) {
    getDoctorScheduleByWeekDate(weekDate: $weekDate) {
      id
      doctor_id
      doctor {
        user {
          full_name
        }
      }
      day
      shift
      is_available
      start_time
      end_time
    }
  }
`;

// Lấy một lịch bác sĩ theo schedule_id
export const GET_DOCTOR_SCHEDULE = gql`
    query GetDoctorSchedule($schedule_id: Int!) {
        doctorSchedule(schedule_id: $schedule_id) {
            schedule_id
            doctor_id
            start_time
            end_time
            is_available
            create_at
        }
    }
`;

// Tạo mới một lịch bác sĩ
export const CREATE_DOCTOR_SCHEDULE = gql`
  mutation CreateDoctorSchedule($input: CreateDoctorScheduleInput!) {
    createDoctorSchedule(input: $input)
  }
`;

// Cập nhật thông tin lịch bác sĩ
export const UPDATE_DOCTOR_SCHEDULE = gql`
    mutation UpdateDoctorSchedule($schedule_id: Int!, $doctorData: CreateDoctorDto_Schedules!) {
        updateDoctorSchedule(schedule_id: $schedule_id, doctorData: $doctorData) {
            schedule_id
            doctor_id
            start_time
            end_time
            is_available
            create_at
        }
    }
`;

// Xóa lịch bác sĩ
export const DELETE_DOCTOR_SCHEDULE = gql`
  mutation DeleteDoctorSchedule($schedule_id: Float!) {
    deleteDoctorSchedule(schedule_id: $schedule_id)
  }
`;