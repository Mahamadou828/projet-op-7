import gql from 'graphql-tag';

export default gql`
  query getAllPost {
    QueryGetAllPost {
      id
      title
      description
      image
      content
      numLike
      numDislike
      users {
        name
        surname
        photo
      }
    }
  }
`;
