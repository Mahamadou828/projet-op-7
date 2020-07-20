const server = require('../server');
const io = require('socket.io')(server);
const { IsValidToken } = require('../auth/JWT-auth');
const { Error } = require('./Controllers/Error');
const MessageRoute = require('./Router/MessageRoute');

exports.connectSocket = () => {
  io.use((socket, next) => {
    try {
      let token = socket.handshake.query.token;
      IsValidToken(token).then((success) => {
        if (success) {
          next();
        }
      });
    } catch {
      next(new Error('unhauthorize'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('sendMessage', (dataJson) => {
      MessageRoute.addMessage(dataJson, socket);
    });
  });
};
