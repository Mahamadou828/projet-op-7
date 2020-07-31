const { Post, Comment } = require('../../databases/databaseInit');
const graphql = require('graphql');
const PostGraphQl = require('../schema/postType');
const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLList } = graphql;
const CommentGraphQl = require('../schema/CommentType');

const MutationCreatePost = {
  type: PostGraphQl,
  args: {
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    image: {
      type: GraphQLString,
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
  resolve(parentValue, queryParam) {
    return new Promise((resolve, reject) => {
      const { id } = queryParam;
      delete queryParam.id;
      Post.update(
        {
          ...queryParam,
        },
        { where: { id } }
      )
        .then(() => {
          Post.findOne({ where: { id } })
            .then((post) => {
              resolve(post);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const MutationDeletePost = {
  type: GraphQLID,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parentValue, { id }) {
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
  resolve(_, __, { req }) {
    console.log(req.session.token);
    console.log(req.session.cookie);
    return Post.findAll({ where: {}, order: [['createdAt', 'DESC']] })
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

const MutationAddComment = {
  type: CommentGraphQl,
  args: {
    PostId: {
      type: GraphQLNonNull(GraphQLID),
    },
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve(parentValue, { PostId, UserId, content }) {
    return new Promise((resolve, reject) => {
      const newComment = new Comment({
        content,
        numLike: 0,
        numDislike: 0,
        UserId,
        PostId,
      });
      newComment
        .save()
        .then((comment) => {
          resolve(comment);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = {
  MutationCreatePost,
  QueryGetOnePost,
  QueryGetAllPost,
  MutationDeletePost,
  MutationUpdatePost,
  MutationAddComment,
};
