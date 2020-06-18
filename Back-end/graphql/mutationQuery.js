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
} = require('./queries/postQuery');

const MutationQuery = new GraphQLObjectType({
  name: 'MutationQuery',
  description: 'Content all mutate query request',
  fields: () => ({
    MutationCreateUser,
    MutationDeleteUser,
    MutationCreatePost,
    MutationDeletePost,
    MutationUpdatePost,
  }),
});

module.exports = MutationQuery;
