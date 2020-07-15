const {
  MutationCreateUser,
  MutationDeleteUser,
} = require('./queries/userQuery');
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const {
  MutationCreatePost,
  MutationDeletePost,
  MutationUpdatePost,
  MutationAddComment,
} = require('./queries/postQuery');

const { MutationCreateFriendRequest } = require('./queries/ChatQuery');

const {
  MutationUpdateAppreciation,
} = require('./queries/PostAppreciationQuery');

const MutationQuery = new GraphQLObjectType({
  name: 'MutationQuery',
  description: 'Content all mutate query request',
  fields: () => ({
    MutationCreateUser,
    MutationDeleteUser,
    MutationCreatePost,
    MutationDeletePost,
    MutationUpdatePost,
    MutationUpdateAppreciation,
    MutationAddComment,
    MutationCreateFriendRequest,
  }),
});

module.exports = MutationQuery;
