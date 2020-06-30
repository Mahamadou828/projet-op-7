const graphql = require('graphql');
const { Post, User, Comment } = require('../../databases/databaseInit');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = graphql;

const CommentGraphQl = new GraphQLObjectType({
  name: 'comment',
  description: 'Comment Model',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
    },
    numLike: {
      type: GraphQLInt,
    },
    numDislike: {
      type: GraphQLInt,
    },
    user: {
      type: require('./userType'),
      resolve(parentValue) {
        const id = parentValue.dataValues.UserId;
        return new Promise((resolve, reject) => {
          User.findOne({ where: { id } })
            .then((user) => {
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    post: {
      type: require('./postType'),
      resolve(parentValue) {
        const id = parentValue.dataValues.PostId;
        return new Promise((resolve, reject) => {
          Post.findOne({ where: { id } })
            .then((post) => {
              resolve(post);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
  }),
});

module.exports = CommentGraphQl;
