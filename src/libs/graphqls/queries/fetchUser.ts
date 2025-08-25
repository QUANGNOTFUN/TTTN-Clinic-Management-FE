import { gql } from "@apollo/client";

export const FETCH_USER = gql`
query Users {
  users(filter:{
    itemsPerPage:20
    page:1
  }){
    data{
      id
      username
      email
      phone
    }
    total
    itemsPerPage
    currentPage
  }
}`;