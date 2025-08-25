import { gql } from "@apollo/client";

export const SEARCH_MEDICATIONS = gql`
	query SearchMedications($input: SearchMedicationsInput!) {
	  searchMedications(input: $input) {
	    id
	    acronym
	    name
	    price
	    available_quantity
	  }
	}
`;

export const GET_MEDICATIONS = gql`
  query GetMedications($input: PaginationInput!) {
    medications(input: $input) {
      items {
        id
	      acronym
	      name
	      price
	      available_quantity
      }
      total
      page
      pageSize
      totalPages
    }
  }
`;

export const GET_MEDICATION = gql`
  query GetMedication($id: Int!) {
    medication(id: $id) {
      id
      acronym
      name
      price
      available_quantity
    }
  }
`;

export const CREATE_MEDICATION = gql`
  mutation CreateMedication($input: CreateMedicationInput!) {
    createMedication(input: $input) {
      id
      acronym
      name
      price
      available_quantity
    }
  }
`;

export const UPDATE_MEDICATION = gql`
  mutation UpdateMedication($id: Int!, $input: UpdateMedicationInput!) {
    updateMedication(id: $id, input: $input) {
      id
      acronym
      name
      price
      available_quantity
    }
  }
`;

export const DELETE_MEDICATION = gql`
  mutation DeleteMedication($id: Int!) {
    deleteMedication(id: $id) {
      id
      acronym
      name
      price
      available_quantity
    }
  }
`;