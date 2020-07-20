const Error = {
  500: 'Internal Server Error Please Contact The Team Support',
  401: 'Unhauthorize',
  400: 'Bad Request Some Elements Of The Request Are Missing ',
};

function SendError(socket, UserId, Message) {
  socket.emit('Error', JSON.stringify({ UserId, Message }));
}

module.exports = {
  SendError,
  Error,
};
