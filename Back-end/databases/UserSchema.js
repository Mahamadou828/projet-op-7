const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');
const bcrypt = require('bcrypt');

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
              console.log('ERRRRRRORR');
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

User.beforeCreate((user, options) => {
  return bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
  });
});

module.exports = User;
