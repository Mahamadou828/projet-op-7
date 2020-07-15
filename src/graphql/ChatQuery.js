import gql from 'graphql-tag';

export const GetAllContact = gql`
  query getAllContact($UserId: ID!) {
    QueryGetAllContact(UserId: $UserId) {
      askFor {
        id
        name
        surname
        photo
      }
      accept
      numberMessage
    }
  }
`;

export const FriendRequest = gql`
  mutation friendRequest($UserId: ID!, $FriendId: ID!) {
    MutationCreateFriendRequest(UserId: $UserId, FriendId: $FriendId)
  }
`;
