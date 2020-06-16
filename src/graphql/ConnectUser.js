import gql from 'graphql-tag';

export default gql`
  query connectUser($email: String!, $password: String!) {
    ConnectUser(email: $email, password: $password) {
      jwt
      access
      error
      userInfo {
        name
        surname
        photo
        description
      }
    }
  }
`;
