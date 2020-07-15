const graphql = require('graphql');
const { Post, User } = require('../../databases/databaseInit');
const { GraphQLObjectType, GraphQLID, GraphQLBoolean } = graphql;

const PostAppreciationGraphQl = new GraphQLObjectType({
  name: 'postAppreciation',
  description: 'Relation between user an post',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    like: {
      type: GraphQLBoolean,
    },
    dislike: {
      type: GraphQLBoolean,
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

module.exports = PostAppreciationGraphQl;
