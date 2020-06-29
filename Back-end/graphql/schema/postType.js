const graphql = require('graphql');
const { User, Post } = require('../../databases/databaseInit');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

const PostGraphQl = new GraphQLObjectType({
  name: 'Post',
  description: 'Post models',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
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
    numLike: {
      type: GraphQLInt,
    },
    numDislike: {
      type: GraphQLInt,
    },
    users: {
      type: require('./userType'),
      resolve(parentValue) {
        const id = parentValue.dataValues.UserId;
        return new Promise((resolve, reject) => {
          User.findOne({
            where: { id },
          })
            .then((user) => {
              resolve(user);
            })
            .catch(() => {
              reject(UserId);
            });
        });
      },
    },
  }),
});

module.exports = PostGraphQl;
