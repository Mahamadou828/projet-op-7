const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');

class Post extends Model {}

Post.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
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

module.exports = Post;
