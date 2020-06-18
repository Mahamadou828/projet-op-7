const express = require('express');
const GraphHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');
const JWTAuth = require('./auth/JWT-auth');
const RouterImage = require('./Router/index');

const app = express();

app.use(cors());
app.use(express.static('file'));
//enfin de simplifier le developpement le systeme de token sera desactiver lors des tests de requetes et remis lors d'integration front
app.use('/', RouterImage);

// app.use('/graphql', JWTAuth);
app.use(
  '/graphql',
  GraphHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  })
);

require('./databases/databaseInit');

module.exports = app;
