const { MutationCreateUser } = require('./queries/userQuery');
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const MutationQuery = new GraphQLObjectType({
  name: 'MutationQuery',
  description: 'Content all mutate query request',
  fields: () => ({
    CreateUser: MutationCreateUser,
  }),
});

module.exports = MutationQuery;
