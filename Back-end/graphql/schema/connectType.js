const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;
const User = require('./userType');

const Connect = new GraphQLObjectType({
  name: 'Connect',
  description: 'An Connecting type for auth user',
  fields: () => ({
    jwt: {
      type: GraphQLString,
    },
    userInfo: {
      type: User,
    },
    access: {
      type: GraphQLBoolean,
    },
    error: {
      type: GraphQLString,
    },
  }),
});

module.exports = Connect;
