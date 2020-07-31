const express = require('express');
const GraphHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');
const { JWTAuth } = require('./auth/JWT-auth');
const RouterImage = require('./Router/index');
const session = require('express-session');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static('file'));
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
//enfin de simplifier le developpement le systeme de token sera desactiver lors des tests de requetes et remis lors d'integration front
app.use('/', RouterImage);

// app.use('/graphql', JWTAuth);
app.use(
  '/graphql',
  GraphHTTP((req) => ({
    schema: schema,
    pretty: true,
    graphiql: true,
    context: { req },
  }))
);

require('./databases/databaseInit');

module.exports = app;
