const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');

class Contact extends Model {}

Contact.init(
  {
    contactList: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    FriendRequestList: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    BlockedUserList: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  { sequelize: Connection, modelName: 'Contact' }
);

Contact.beforeSave((contact) => {
  return new Promise((resolve, reject) => {
    try {
      contact.contactList = JSON.stringify([]);
      contact.FriendRequestList = JSON.stringify([]);
      contact.BlockedUserList = JSON.stringify([]);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
});

module.exports = Contact;
