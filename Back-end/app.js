const express = require('express');
const GraphHTTP = require('express-graphql');
const schema = require('./graphql/schema');

const bodyParser = require('body-parser');
const app = express();

require('./auth/passport');
const passport = require('passport');

//enfin de simplifier le developpement le systeme de token sera desactiver lors des tests de requetes et remis lors d'integration front
// app.use(passport.authenticate('jwt', { session: false }));
app.use(bodyParser.json());

app.use(express.static('images'));
app.use(
  '/graphql',
  GraphHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  })
);

module.exports = app;
