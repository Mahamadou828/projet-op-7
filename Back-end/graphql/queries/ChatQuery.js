const { Contact } = require('../../databases/databaseInit');
const graphql = require('graphql');
const ContactType = require('../schema/ContactType');
const { GraphQLNonNull, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;
const { Op } = require('sequelize');

const QueryGetAllContact = {
  type: new GraphQLList(ContactType),
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve(parentValue, { UserId }) {
    console.log(UserId);
    return new Promise((resolve, reject) => {
      Contact.findAll({
        where: {
          [Op.or]: [{ UserId }, { askFor: UserId }],
        },
      })
        .then((contacts) => {
          resolve(contacts);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const MutationCreateFriendRequest = {
  type: GraphQLBoolean,
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    FriendId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },

  resolve(parentValue, { UserId, FriendId }) {
    return new Promise((resolve, reject) => {
      Contact.findOrCreate({
        where: {
          UserId,
          askFor: FriendId,
          accept: 'wait',
          numberMessage: 0,
        },
      })
        .then((contact) => {
          console.log(contact);
          if (contact) {
            resolve(true);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = {
  QueryGetAllContact,
  MutationCreateFriendRequest,
};
