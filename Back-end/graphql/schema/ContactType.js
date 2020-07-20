const graphql = require('graphql');
const { User } = require('../../databases/databaseInit');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;
const UserType = require('./userType');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'List of User contact',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    contactList: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        let contactList = parentValue.dataValues.contactList;
        return new Promise((resolve, reject) => {
          contactList = JSON.parse(contactList);
          getAllUsersOfAnList(contactList)
            .then((users) => {
              resolve(users);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    FriendRequestList: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        let contactList = parentValue.dataValues.FriendRequestList;
        return new Promise((resolve, reject) => {
          contactList = JSON.parse(contactList);
          getAllUsersOfAnList(contactList)
            .then((users) => {
              resolve(users);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    BlockedUserList: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        let contactList = parentValue.dataValues.BlockedUserList;
        return new Promise((resolve, reject) => {
          contactList = JSON.parse(contactList);
          getAllUsersOfAnList(contactList)
            .then((users) => {
              resolve(users);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
  }),
});

function getAllUsersOfAnList(userList) {
  return new Promise((resolve, reject) => {
    User.findAll({
      where: {
        id: userList,
      },
    })
      .then((users) => {
        resolve(users);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}

module.exports = ContactType;
