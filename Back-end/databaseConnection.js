const Sequelize = require('sequelize');

const Connection = new Sequelize('groupomania', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// const SecondConnection = new Sequelize(
//   'dbs656796',
//   'dbu62189',
//   '122121MS192001**##__ms',
//   {
//     host: 'db5000716088.hosting-data.io',
//     dialect: 'mysql',
//   }
// );

// SecondConnection.authenticate()
//   .then(() => {
//     console.log('Connection to network database done');
//   })
//   .catch((error) => {
//     console.log(error);
//   });

Connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = Connection;
