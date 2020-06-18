// const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const { jsonSecret } = require('./secretKey');
// const jwt = require('jsonwebtoken');
// const { User } = require('../databases/databaseInit');
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNXwkMmIkMTAkLy4wVWczOTJJYjNwY0E0ZnJHUHdhLjE4UTZKUlFsQW44VE5TQXozOU5NMERhYWJFcktmYk8iLCJpYXQiOjE1OTI0ODYyMzh9.rdsT7CknmC1qq1gM70huccrmBrXLJBk3kNfKv2Q3RDk';

// const jwtOption = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('authorization'),
//   secretOrKey: jsonSecret,
//   passReqToCallback: true,
// };

// //const authIndex = req.rawHeaders.indexOf('authorization');

// const jwtLogin = new JwtStrategy(jwtOption, (req, jwt_payload, done) => {
//   console.log(jwt_payload);
//   console.log(req.header.authorization);
//   return done(null, { user: 'user' });
// });

// // if (!jwt_payload.id) {
// //   if (req.header.authorization) {
// //     const encode = encodeURI(req.header.connectedToken);
// //     const actuallDate = new Date();
// //     const connectUserInfo = encode.split('?');
// //     if (
// //       connectUserInfo[0] === actuallDate.getDate() &&
// //       parseInt(connectUserInfo[1]) != 0
// //     ) {
// //       return done(null, false);
// //     } else {
// //       return done('Invalid or Missing Token', false);
// //     }
// //   } else {
// //     done('Invalid or Missing Token', false);
// //   }
// // } else {
// //   User.findOne({ where: { id: jwt_payload.sub } }).then((user) => {
// //     if (user) {
// //       return done(null, user);
// //     } else {
// //       return done('Invalid Token', false);
// //     }
// //   });
// // }
// passport.use(jwtLogin);
