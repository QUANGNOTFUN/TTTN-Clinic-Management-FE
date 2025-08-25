import { gql } from "@apollo/client";

export const GET_PATIENT_BY_ID = gql`
query GetAllUser{
  getAllUsers(pagination: {page: 1, limit: 10}) {
    data {
      id
      email
      role
      full_name
    }
    total
    currentPage
    itemsPerPage
  }
}`;
