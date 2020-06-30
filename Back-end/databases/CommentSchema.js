const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
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
  { sequelize: Connection, modelName: 'Comment' }
);

module.exports = Comment;
