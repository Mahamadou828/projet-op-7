const graphql = require('graphql');
const { User, Post } = require('../../databases/databaseInit');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const PostGraphQl = require('./postType');
const { defaultPost, defaultUser } = require('../defaultObjetSchema/index');

const UserGraphQl = new GraphQLObjectType({
  name: 'User',
  description: 'User models',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    surname: {
      type: GraphQLNonNull(GraphQLString),
    },
    photo: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    posts: {
      type: new GraphQLList(PostGraphQl),
      resolve(parentValue, { id }) {
        return new Promise((resolve, reject) => {
          if (id) {
            User.findAll({
              where: { id },
              include: [
                {
                  model: Post,
                },
              ],
            })
              .then((posts) => {
                resolve(posts);
              })
              .catch(() => {
                reject(defaultPost);
              });
          } else {
            console.log('la');
            resolve({
              ...defaultPost,
              users: defaultUser,
            });
          }
        });
      },
    },
  }),
});

module.exports = UserGraphQl;
