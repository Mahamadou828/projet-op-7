const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const { QueryConnectUser, QueryGetAllUser } = require('./queries/userQuery');
const { QueryGetOnePost, QueryGetAllPost } = require('./queries/postQuery');
const {
  QueryGetUserAppreciationOfAnPost,
} = require('./queries/PostAppreciationQuery');
const { QueryGetAllMessage, QueryContactInfo } = require('./queries/ChatQuery');
const { QueryGetSessionToken } = require('./queries/SessionQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root for all query',
  fields: () => ({
    ConnectUser: QueryConnectUser,
    QueryGetOnePost,
    QueryGetAllPost,
    QueryGetUserAppreciationOfAnPost: QueryGetUserAppreciationOfAnPost,
    QueryGetAllUser,
    QueryGetAllMessage,
    QueryContactInfo,
    QueryGetSessionToken,
  }),
});

module.exports = RootQuery;
