import gql from 'graphql-tag';

export default gql`
  mutation createUser(
    $email: String!
    $password: String!
    $name: String!
    $surname: String!
    $photo: String!
    $description: String
  ) {
    MutationCreateUser(
      email: $email
      password: $password
      name: $name
      surname: $surname
      photo: $photo
      description: $description
    ) {
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
