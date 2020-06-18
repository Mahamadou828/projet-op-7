const { Post } = require('../../databases/databaseInit');
const graphql = require('graphql');
const PostGraphQl = require('../schema/postType');
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } = graphql;

const MutationCreatePost = {
  type: PostGraphQl,
  args: {
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    image: {
      type: GraphQLNonNull(GraphQLString),
    },
    content: {
      type: GraphQLString,
    },
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve(parentValue, { title, description, image, content, UserId }) {
    const newPost = new Post({
      title,
      description,
      image,
      content,
      numDislike: 0,
      numLike: 0,
      UserId,
    });
    return newPost
      .save()
      .then((postSave) => {
        return postSave;
      })
      .catch((error) => {
        return error;
      });
  },
};

const MutationUpdatePost = {
  type: PostGraphQl,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  },
  resolve(parentValue) {
    return Post.update(
      {
        ...parentValue,
      },
      { where: { id: parentValue.id } }
    )
      .then((newPost) => {
        return newPost;
      })
      .catch((error) => {
        return error;
      });
  },
};

const MutationDeletePost = {
  type: GraphQLID,
  args: {
    id: { type: GraphQLID },
  },
  resolver(parentValue, { id }) {
    return Post.destroy({ where: { id } })
      .then(() => {
        return id;
      })
      .catch((error) => {
        return error;
      });
  },
};

const QueryGetAllPost = {
  type: new GraphQLList(PostGraphQl),
  resolve() {
    return Post.findAll()
      .then((posts) => {
        return posts;
      })
      .catch((error) => {
        return error;
      });
  },
};

const QueryGetOnePost = {
  type: PostGraphQl,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parentValue, { id }) {
    return Post.findOne({ where: { id } })
      .then((post) => {
        return post;
      })
      .catch((error) => {
        return error;
      });
  },
};

module.exports = {
  MutationCreatePost,
  QueryGetOnePost,
  QueryGetAllPost,
  MutationDeletePost,
  MutationUpdatePost,
};
