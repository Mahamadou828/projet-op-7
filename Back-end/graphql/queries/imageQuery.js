const graphql = require('graphql');
const { GraphQLString, GraphQLNonNull } = graphql;
const fs = require('fs');
const { GraphQLUpload } = require('graphql-upload');

const pathImage =
  '/Users/79206/Desktop/cours/openclassroom/projet7/Back-end/image/';
const MIME_TYPE = ['jpg', 'jpeg', 'png', 'bmp'];

const MutationUploadImage = {
  type: GraphQLString,
  args: {
    file: { type: GraphQLNonNull(GraphQLUpload) },
  },
  resolve(parentValue, { file }) {
    const { filename, mimetype } = file;

    if (MIME_TYPE.includes(mimetype)) {
      const status = fs.writeFile(pathImage, file, (error) => {
        if (error) {
          return false;
        } else {
          return true;
        }
      });
      if (status) {
        return filename;
      } else {
        return "Error file can't been saved";
      }
    } else {
      return "Error file can't been saved";
    }
  },
};

module.exports = { MutationUploadImage };
