const graphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean } = graphql;
const { QueryConnectUser } = require('./queries/userQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root for all query',
  fields: () => ({
    ConnectUser: QueryConnectUser,
    getName: {
      type: GraphQLBoolean,
      resolve(parentValue) {
        return true;
      },
    },
  }),
});

module.exports = RootQuery;
