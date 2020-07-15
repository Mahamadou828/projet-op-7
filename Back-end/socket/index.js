const server = require('../server');

const io = require('socket.io')(server);

exports.connectSocket = () => {
  io.on('connection', (socket) => {
    console.log('Un connecter');
  });
};
