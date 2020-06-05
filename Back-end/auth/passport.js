const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jsonSecret = require('./secretKey');
const { User } = require('../databases/databaseInit');

const jwtOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: jsonSecret,
  passReqToCallback: true,
};

const jwtLogin = new JwtStrategy(jwtOption, (req, jwt_payload, done) => {
  if (!jwt_payload.id) {
    if (req.header.connectedToken) {
      const encode = encodeURI(req.header.connectedToken);
      const actuallDate = new Date();
      const connectUserInfo = encode.split('?');
      if (
        connectUserInfo[0] === actuallDate.getDate() &&
        parseInt(connectUserInfo[1]) != 0
      ) {
        return done(null, false);
      } else {
        return done('Invalid or Missing Token', false);
      }
    } else {
      done('Invalid or Missing Token', false);
    }
  } else {
    User.findOne({ where: { id: jwt_payload.sub } }).then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done('Invalid Token', false);
      }
    });
  }
});

passport.use(jwtLogin);
