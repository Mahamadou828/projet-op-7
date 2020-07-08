import gql from 'graphql-tag';

const getAllData = `
id
title
description
image
content
numLike
numDislike
users {
  id
  name
  surname
  photo
}`;

export const CreatePostQuery = gql`
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
      ${getAllData}
    }
  }
`;

export const GetAllPostQuery = gql`
  query getAllPost {
    QueryGetAllPost {
      ${getAllData}
    }
  }
`;

export const UpdatePostQuery = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $description: String
    $image: String
    $content: String
  ) {
    MutationUpdatePost(
      id: $id
      title: $title
      description: $description
      image: $image
      content: $content
    ) {
      ${getAllData}
    }
  }
`;

export const DeletePostQuery = gql`
  mutation deletePost($id: ID!) {
    MutationDeletePost(id: $id)
  }
`;
