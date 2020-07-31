import gql from 'graphql-tag';

export default gql`
  query connectUser(
    $email: String!
    $password: String!
    $openSession: Boolean
  ) {
    ConnectUser(email: $email, password: $password, openSession: $openSession) {
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
