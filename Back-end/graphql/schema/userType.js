const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const User = new GraphQLObjectType({
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
    // posts: {
    //   type: new GraphQLList(Post),
    //   resolve(User) {
    //     return User.getPostUser();
    //   },
    // },
  }),
});

module.exports = User;
