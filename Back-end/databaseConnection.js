const Sequelize = require('sequelize');

const Connection = new Sequelize('groupomania', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

Connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Connection;
