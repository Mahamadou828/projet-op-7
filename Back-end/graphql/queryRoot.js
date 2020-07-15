const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const { QueryConnectUser, QueryGetAllUser } = require('./queries/userQuery');
const { QueryGetOnePost, QueryGetAllPost } = require('./queries/postQuery');
const {
  QueryGetUserAppreciationOfAnPost,
} = require('./queries/PostAppreciationQuery');
const { QueryGetAllContact } = require('./queries/ChatQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root for all query',
  fields: () => ({
    ConnectUser: QueryConnectUser,
    QueryGetOnePost,
    QueryGetAllPost,
    QueryGetUserAppreciationOfAnPost: QueryGetUserAppreciationOfAnPost,
    QueryGetAllContact,
    QueryGetAllUser,
  }),
});

module.exports = RootQuery;
