const express = require('express');
const GraphHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');
const RouterImage = require('./Router/index');

const app = express();

require('./auth/passport');
const passport = require('passport');

app.use(cors());
app.use(express.static('file'));
//enfin de simplifier le developpement le systeme de token sera desactiver lors des tests de requetes et remis lors d'integration front
// app.use(passport.authenticate('jwt', { session: false }));

app.use('/', RouterImage);

app.use(
  '/graphql',
  GraphHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  })
);

module.exports = app;
