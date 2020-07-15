const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');

class Message extends Model {}

Message.init(
  {
    receiver: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { sequelize: Connection, modelName: 'Message' }
);

module.exports = Message;
