import gql from 'graphql-tag';

export const GetAppreciation = gql`
  query getAppreciation($UserId: ID!, $PostId: ID!) {
    QueryGetUserAppreciationOfAnPost(UserId: $UserId, PostId: $PostId) {
      like
      dislike
    }
  }
`;

export const SetAppreciation = gql`
  mutation setAppreciation(
    $UserId: ID!
    $PostId: ID!
    $like: Boolean!
    $dislike: Boolean!
  ) {
    MutationUpdateAppreciation(
      UserId: $UserId
      PostId: $PostId
      like: $like
      dislike: $dislike
    ) {
      id
    }
  }
`;
