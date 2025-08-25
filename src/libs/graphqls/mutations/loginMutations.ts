import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($userData: LoginDto!) {
    login(userData: $userData) {
      accessToken
      refreshToken
    }
  }
`;

export default LOGIN_MUTATION;
