const { jsonSecret, auth } = require('./secretKey');
const jwt = require('jsonwebtoken');
const { User } = require('../databases/databaseInit');

const JWTAuth = (req, res, next) => {
  try {
    const tokenIndex = req.rawHeaders.indexOf('authorization');
    const access = JSON.parse(
      req.rawHeaders[req.rawHeaders.indexOf('accessWasSend') + 1]
    );
    if (tokenIndex > -1) {
      const tokenUser = req.rawHeaders[tokenIndex + 1];
      if (access) {
        IsValidToken(tokenUser)
          .then((success) => {
            if (success) {
              next();
            }
          })
          .catch(() => {
            res.status(401).json({ error: 'Unhanthorize' });
          });
      } else {
        const decodedToken = tokenUser.split('?');
        const date = new Date();
        if (
          decodedToken[0] === auth &&
          decodedToken[1] === JSON.stringify(date.getDate()) &&
          decodedToken[2] === 'AUTH_ACCESS'
        ) {
          next();
        } else {
          res.status(401).json({
            error: 'Unhanthorize',
          });
        }
      }
    } else {
      res.status(401).json({ error: 'Unhanthorize' });
    }
  } catch {
    res.status(401).json({ error: 'Unhanthorize' });
  }
};

function IsValidToken(tokenUser) {
  return new Promise((resolve, reject) => {
    const decodedToken = jwt.verify(tokenUser, jsonSecret);
    const sub = decodedToken.sub.split('|');
    User.findOne({ where: { id: sub[0] } })
      .then((user) => {
        if (!user) {
          reject(false);
        } else {
          if (sub[1] === user.email) {
            resolve(true);
          } else {
            reject(false);
          }
        }
      })
      .catch(() => {
        reject(false);
      });
  });
}

module.exports = {
  JWTAuth,
  IsValidToken,
};
