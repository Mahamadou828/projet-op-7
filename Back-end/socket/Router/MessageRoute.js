const MessageControllers = require('../Controllers/MessageControllers');
const { SendError, Error } = require('../Controllers/Error');

exports.addMessage = (dataJson, socket) => {
  const { message, UserId, idContact } = JSON.parse(dataJson);
  MessageControllers.addMessage(message, UserId, idContact)
    .then(({ success, createdMessage }) => {
      if (!success) {
        SendError(socket, UserId, Error[500]);
      } else {
        socket.emit(
          'receiveMessage',
          JSON.stringify({ createdMessage, idContact })
        );
        socket.emit(
          'messageCreated',
          JSON.stringify({ UserId, createdMessage })
        );
      }
    })
    .catch((error) => {
      SendError(socket, UserId, Error[500]);
    });
};
