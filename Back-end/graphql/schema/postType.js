const graphql = require('graphql');
const { User, Post } = require('../../databases/databaseInit');
const UserGraphQl = require('./userType');

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
      resolve(parentValue, { id }) {
        return new Promise((resolve, reject) => {
          Post.findAll({
            where: { id },
            include: [
              {
                model: User,
              },
            ],
          })
            .then((user) => {
              resolve(user);
            })
            .catch(() => {
              reject(id);
            });
        });
      },
    },
  }),
});

module.exports = PostGraphQl;
