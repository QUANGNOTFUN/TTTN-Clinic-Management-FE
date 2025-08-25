import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($input: GetUserByIdInput!) {
    getUserById(input: $input) {
      id
      full_name
      email
      phone
      address
      date_of_birth
      avatar
    }
  }
`;

export const GET_PATIENT_BY_ID = gql`
query GetPatientWithUser($input: GetPatientByIdInput!) {
  findOnePatient(input: $input) {
    gender
    created_at
    updated_at
    user {
      email
      full_name
      phone
      address
      role 
      avatar
      date_of_birth
      avatar
    }
  }
}
`;

export const UPDATE_PATIENT_BY_ID = gql`
mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient(input: $input) {
    gender
    created_at
    user {
      id
      full_name
      email
      phone
      date_of_birth
    }
  }
}
`

const SEND_OTP_MUTATION = gql`
  mutation SendResetPasswordOtp($input: SendOtpInput!) {
    sendResetPasswordOtp(input: $input) {
      success
      message
    }
  }
`;
