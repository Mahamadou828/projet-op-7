import gql from 'graphql-tag';

export const GetSession = gql`
  query getSession {
    QueryGetSessionToken {
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
