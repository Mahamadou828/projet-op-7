export function SendMessage(message) {
  if (message.length > 0) {
    const { UserId } = this.props,
      { idContact } = this.state;
    this.props.socket.emit(
      'sendMessage',
      JSON.stringify({ message, UserId, idContact })
    );
  }
}

export function MessageReceive(callback) {
  this.props.socket.on('receiveMessage', (dataJson) => {
    const { message, idContact } = JSON.parse(dataJson);
    if (idContact === this.props.UserId) {
      const newMessage = {
        createdAt: Date.parse(message.createdAt),
        id: message.id,
        message: message.message,
        receiver: {
          id: message.receiver,
        },
      };

      if (callback) {
        callback(newMessage);
      }
    }
  });
}

export function MessageCreated(callback) {
  this.props.socket.on('messageCreated', (dataJson) => {
    const { UserId, createdMessage } = JSON.parse(dataJson);
    if (UserId === this.props.UserId) {
      const newMessage = {
        createdAt: Date.parse(createdMessage.createdAt),
        id: createdMessage.id,
        message: createdMessage.message,
        receiver: {
          id: createdMessage.receiver,
        },
      };
      if (callback) {
        callback(newMessage);
      }
    }
  });
}
