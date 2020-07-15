import gql from 'graphql-tag';

export const GetAllUser = gql`
  query getAllUser {
    QueryGetAllUser {
      id
      name
      surname
      photo
      description
    }
  }
`;
