const { MutationCreateUser } = require('./queries/userQuery');
const graphql = require('graphql');
const { GraphQLObjectType } = graphql;
const { MutationUploadImage } = require('./queries/imageQuery');

const MutationQuery = new GraphQLObjectType({
  name: 'MutationQuery',
  description: 'Content all mutate query request',
  fields: () => ({
    CreateUser: MutationCreateUser,
    SaveFile: MutationUploadImage,
  }),
});

module.exports = MutationQuery;
