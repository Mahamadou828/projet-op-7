const { Message } = require('../../databases/databaseInit');
const Sequelize = require('sequelize');

exports.addMessage = (message, UserId, receiver) => {
  const newMessage = new Message({
    receiver,
    UserId,
    message,
    date: Sequelize.fn('now'),
  });

  return new Promise((resolve, reject) => {
    newMessage
      .save()
      .then((createdMessage) => {
        if (createdMessage) {
          resolve({ success: true, createdMessage });
        } else reject('500 internal error');
      })
      .catch((error) => {
        reject(error);
      });
  });
};
