const graphql = require('graphql');
const connectType = require('../schema/connectType');
const jwt = require('jsonwebtoken');
const { jsonSecret } = require('../../auth/secretKey');
const { User } = require('../../databases/databaseInit');

const QueryGetSessionToken = {
  type: connectType,
  resolve(_, __, { req }) {
    return new Promise((resolve, reject) => {
      if (req.session.token) {
        const decryptedToken = jwt.decode(req.session.token, jsonSecret);
        const userInfo = decryptedToken.sub.split('|');
        User.findOne({
          where: { id: parseInt(userInfo[0]), email: userInfo[1] },
        })
          .then((user) => {
            if (user !== undefined) {
              const resolver = {
                jwt: req.session.token,
                userInfo: user,
                access: true,
                error: '',
              };
              resolve(resolver);
            } else {
              reject("there's none vailable session");
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else reject("there's none vailable session");
    });
  },
};

module.exports = {
  QueryGetSessionToken,
};
