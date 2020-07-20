const { Contact, Message } = require('../../databases/databaseInit');
const graphql = require('graphql');
const ContactType = require('../schema/ContactType');
const messageType = require('../schema/MessageType');
const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
} = graphql;
const { Op } = require('sequelize');
const lodash = require('lodash');

const QueryGetAllMessage = {
  type: new GraphQLList(messageType),
  args: {
    UserId: {
      type: GraphQLID,
    },
    contactId: {
      type: GraphQLID,
    },
  },
  resolve(parentValue, { UserId, contactId }) {
    return new Promise((resolve, reject) => {
      Message.findAll({
        order: [['createdAt', 'ASC']],
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ UserId }, { receiver: contactId }],
            },
            {
              [Op.and]: [{ UserId: contactId }, { receiver: UserId }],
            },
          ],
        },
      })
        .then((messages) => {
          resolve(messages);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const QueryContactInfo = {
  type: ContactType,
  args: {
    UserId: {
      type: GraphQLID,
    },
  },
  resolve(parentValue, { UserId }) {
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: { UserId },
      })
        .then((contact) => {
          resolve(contact);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const MutationSendFriendRequest = {
  type: GraphQLBoolean,
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    ContactId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve(parentValue, { UserId, ContactId }) {
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          UserId: ContactId,
        },
      })
        .then((contact) => {
          const blockedList = JSON.parse(contact.BlockedUserList);
          const FriendRequestList = JSON.parse(contact.FriendRequestList);

          if (
            !blockedList.includes(`${UserId}`) &&
            !FriendRequestList.includes(`${UserId}`)
          ) {
            FriendRequestList.push(UserId);
            Contact.update(
              { FriendRequestList: JSON.stringify(FriendRequestList) },
              {
                where: { UserId: ContactId },
              }
            )
              .then(() => {
                resolve(true);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const MutationRespondToFriendRequest = {
  type: GraphQLBoolean,
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    ContactId: {
      type: GraphQLNonNull(GraphQLID),
    },
    Type: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve(parentValue, { UserId, ContactId, Type }) {
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          UserId,
        },
      })
        .then((contact) => {
          const contactList = JSON.parse(contact.contactList),
            BlockedUserList = JSON.parse(contact.BlockedUserList);
          const newFriendRequestList = lodash.filter(
            [...JSON.parse(contact.FriendRequestList)],
            (n) => {
              return n !== ContactId;
            }
          );
          switch (Type) {
            case 'accept': {
              contactList.push(ContactId);
              break;
            }
            case 'block': {
              BlockedUserList.push(ContactId);
              break;
            }
            case 'denied': {
              break;
            }
            default: {
              reject(new Error('500 internal server Error'));
            }
          }
          Contact.update(
            {
              BlockedUserList: JSON.stringify(BlockedUserList),
              contactList: JSON.stringify(contactList),
              FriendRequestList: JSON.stringify(newFriendRequestList),
            },
            { where: { UserId } }
          )
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const MutationUnblockUser = {
  type: GraphQLBoolean,
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    ContactId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve(parentValue, { UserId, ContactId }) {
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: { UserId },
      })
        .then((contact) => {
          const newBlockedList = lodash.filter(
            [...JSON.parse(contact.BlockedUserList)],
            (n) => {
              return n !== ContactId;
            }
          );
          Contact.update(
            { BlockedUserList: JSON.stringify(newBlockedList) },
            { where: { UserId } }
          )
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = {
  QueryGetAllMessage,
  QueryContactInfo,
  MutationSendFriendRequest,
  MutationRespondToFriendRequest,
  MutationUnblockUser,
};
