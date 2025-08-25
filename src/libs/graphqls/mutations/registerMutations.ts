import { gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
      mutation Register($userData: RegisterDto!) {
      register(userData: $userData) {
        id
        email
        full_name
        role
      }
    }
`;

export default REGISTER_MUTATION;
