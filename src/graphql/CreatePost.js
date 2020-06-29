import gql from 'graphql-tag';

export default gql`
  mutation createPost(
    $title: String
    $description: String!
    $image: String
    $UserId: ID!
    $content: String
  ) {
    MutationCreatePost(
      title: $title
      description: $description
      image: $image
      UserId: $UserId
      content: $content
    ) {
      id
    }
  }
`;
