const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');
const Post = require('./PostSchema');

class PostAppreciation extends Model {}

PostAppreciation.init(
  {
    like: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    dislike: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: Connection, modelName: 'PostRealation' }
);

module.exports = PostAppreciation;
