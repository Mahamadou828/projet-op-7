const graphql = require('graphql');
const { User } = require('../../databases/databaseInit');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;
const UserType = require('./userType');

const ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'List of User contact',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    user: {
      type: UserType,
      resolve(parentValue) {
        const id = parentValue.dataValues.UserId;
        return new Promise((resolve, reject) => {
          User.findOne({
            where: { id },
          })
            .then((user) => {
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    askFor: {
      type: UserType,
      resolve(parentValue) {
        const id = parentValue.dataValues.askFor;
        return new Promise((resolve, reject) => {
          User.findOne({
            where: { id },
          })
            .then((user) => {
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
    },
    accept: {
      type: GraphQLString,
    },
    numberMessage: {
      type: GraphQLInt,
    },
  }),
});

module.exports = ContactType;
