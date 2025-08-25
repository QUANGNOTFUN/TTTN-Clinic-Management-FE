import { gql } from "@apollo/client";

export const GET_DOCTORS = gql`
    query GetDoctors {
        doctors {
          id
          qualifications
            specialty
            hospital
            work_seniority
            default_fee
            titles
            positions
            rating
            gender
          user {
            id
            email
            full_name
            phone
            address
            date_of_birth
            avatar
          }
        }
    }
`;

// Lấy 1 bác sĩ theo ID
export const GET_DOCTOR = gql`
    query GetDoctor($id: String!) {
        doctor(id: $id) {
           id
            qualifications
            specialty
            hospital
            work_seniority
            default_fee
            titles
            positions
            rating
            gender
            user {
              full_name
              email
              phone
              id
              avatar
            }
        }
    }
`;

// Tạo mới 1 bác sĩ
export const CREATE_DOCTOR = gql`
    mutation createDoctor($doctorData: RegisterDoctorInput!) {
        createDoctor(doctorData: $doctorData)
        }
`;


// Cập nhật thông tin bác sĩ
export const UPDATE_DOCTOR = gql`
    mutation UpdateDoctor($id: String!, $doctorData: UpdateDoctorInput!) {
        updateDoctor(id: $id, doctorData: $doctorData) {
            id
            user {
                id
                email
                full_name
                gender
            }
            qualifications
            work_seniority
            specialty
            hospital
        }
    }
`;

// Xóa bác sĩ
export const DELETE_DOCTOR = gql`
    mutation DeleteDoctor($id: String!) {
        deleteDoctor(id: $id) {
            id
        }
    }
`;
