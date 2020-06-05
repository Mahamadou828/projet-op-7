const graphql = require('graphql');
const { GraphQLString } = graphql;

const MutationUploadImage = {
  type: GraphQLString,
  args: {
    file: {
      description: 'file to upload',
      type: GraphQLUpload,
    },
  },
  resolve(parentValue, { image }) {},
};
