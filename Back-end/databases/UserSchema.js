const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');
const bcrypt = require('bcrypt');
const Contact = require('./ContactSchema');

class User extends Model {}
User.init(
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        isUnique: (value, next) => {
          User.findOne({ where: { email: value } }).then((error, user) => {
            if (error) {
              return next(error);
            } else if (user) {
              return next('Email is already exist');
            } else {
              next();
            }
          });
        },
      },
      unique: {
        msg: 'Error email already exist',
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { sequelize: Connection, modelName: 'User' }
);

User.beforeSave((user, options) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        reject(err);
      }
      user.password = hash;
      resolve(true);
    });
  });
});

User.afterCreate((user) => {
  return new Promise((resolve, reject) => {
    const newContact = new Contact({
      UserId: user.id,
    });
    newContact
      .save()
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

module.exports = User;
