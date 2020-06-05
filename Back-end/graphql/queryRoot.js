const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const { QueryConnectUser } = require('./queries/userQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root for all query',
  fields: () => ({
    ConnectUser: QueryConnectUser,
  }),
});

module.exports = RootQuery;
