import gql from 'graphql-tag';

export default gql`
  query connectUser($email: String!, $password: String!) {
    ConnectUser(email: $email, password: $password) {
      jwt
      access
      error
      userInfo {
        id
        name
        surname
        photo
        description
      }
    }
  }
`;
