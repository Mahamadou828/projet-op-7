import gql from 'graphql-tag';

const getUserInfo = `
name
surname
id
photo
`;

export const GetAllMessage = gql`
  query getAllMessage($UserId: ID!, $contactId: ID!) {
    QueryGetAllMessage(UserId: $UserId, contactId: $contactId) {
      createdAt
      id
      message
      receiver {
        id
        photo
      }
    }
  }
`;

export const GetAllContact = gql`
  query getAllContact ($UserId: ID!) {
    QueryContactInfo(UserId: $UserId) {
      contactList {
        ${getUserInfo}
      }
    }
  }
`;

export const GetAllFriendRequest = gql`
query getAllFriendRequest ($UserId: ID!) {
  QueryContactInfo(UserId: $UserId) {
    FriendRequestList {
      ${getUserInfo}
    }
  }
}
`;

export const GetAllBlockedUser = gql`
query getAllBlockedUser ($UserId: ID!) {
  QueryContactInfo(UserId: $UserId) {
    BlockedUserList {
      ${getUserInfo}
    }
  }
}
`;

export const SendFriendRequest = gql`
  mutation sendFriendRequest($UserId: ID!, $ContactId: ID!) {
    MutationSendFriendRequest(UserId: $UserId, ContactId: $ContactId)
  }
`;

export const RespondToFriendRequest = gql`
  mutation respondToFriendRequest(
    $UserId: ID!
    $ContactId: ID!
    $Type: String!
  ) {
    MutationRespondToFriendRequest(
      UserId: $UserId
      ContactId: $ContactId
      Type: $Type
    )
  }
`;

export const UnblockUser = gql`
  mutation unblockUser($UserId: ID!, $ContactId: ID!) {
    MutationUnblockUser(UserId: $UserId, ContactId: $ContactId)
  }
`;

export const FriendRequest = gql`
  mutation sendFriendRequest($UserId: ID!, $ContactId: ID!) {
    MutationSendFriendRequest(UserId: $UserUd, ContactId: $ContactId)
  }
`;
