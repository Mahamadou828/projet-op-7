import gql from 'graphql-tag';

export default gql`
  mutation createUser(
    $email: String!
    $password: String!
    $name: String!
    $surname: String!
    $photo: String!
    $description: String
    $openSession: Boolean
  ) {
    MutationCreateUser(
      email: $email
      password: $password
      name: $name
      surname: $surname
      photo: $photo
      description: $description
      openSession: $openSession
    ) {
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
