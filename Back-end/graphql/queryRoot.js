const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const { QueryConnectUser } = require('./queries/userQuery');
const { QueryGetOnePost, QueryGetAllPost } = require('./queries/postQuery');
const {
  QueryGetUserAppreciationOfAnPost,
} = require('./queries/PostAppreciationQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root for all query',
  fields: () => ({
    ConnectUser: QueryConnectUser,
    QueryGetOnePost,
    QueryGetAllPost,
    QueryGetUserAppreciationOfAnPost: QueryGetUserAppreciationOfAnPost,
  }),
});

module.exports = RootQuery;
