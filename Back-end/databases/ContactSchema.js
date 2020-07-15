const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');

class Contact extends Model {}

Contact.init(
  {
    askFor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    accept: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberMessage: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: Connection, modelName: 'Contact' }
);

module.exports = Contact;
