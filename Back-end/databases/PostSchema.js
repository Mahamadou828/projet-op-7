const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');
const fs = require('fs');
const PostAppreciation = require('./PostAppreciation');

class Post extends Model {}

Post.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    numLike: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numDislike: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: Connection, modelName: 'Post' }
);

Post.beforeBulkDestroy(async (post, option) => {
  const {
    where: { id },
  } = post;
  const recoveredPost = await Post.findOne({
    where: { id },
    attributes: ['image'],
  });
  const {
    dataValues: { image },
  } = recoveredPost;
  return new Promise((resolve, reject) => {
    if (image !== null) {
      if (image.length > 0) {
        const file = image.split('/file/')[1];
        fs.unlink(`./Back-end/file/${file}`, (error, content) => {
          if (error) {
            reject(error);
          }
        });
      }
    }
    PostAppreciation.destroy({
      where: { PostId: id },
    });
    resolve(true);
  });
});
module.exports = Post;
