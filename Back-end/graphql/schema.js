const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQuery = require('./queryRoot');
const MutationQuery = require('./mutationQuery');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});
