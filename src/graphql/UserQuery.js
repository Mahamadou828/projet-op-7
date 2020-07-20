import gql from 'graphql-tag';

export const GetAllUser = gql`
  query getAllUser($UserId: ID!) {
    QueryGetAllUser(UserId: $UserId) {
      id
      name
      surname
      photo
      description
    }
  }
`;
