const graphql = require('graphql');
const { User } = require('../../databases/databaseInit');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLScalarType,
} = graphql;
const UserType = require('./userType');
const { Kind } = require('graphql/language');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  description: 'Message of an User',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    message: {
      type: GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLScalarType({
        name: 'createAt',
        description: 'Date when the message was created',
        parseValue(value) {
          return value;
        },
        serialize(value) {
          return value.getTime();
        },
        parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return new Date(ast.value);
          }
          return null;
        },
      }),
    },
    receiver: {
      type: GraphQLNonNull(UserType),
      resolve(parentValue) {
        const id = parseInt(parentValue.dataValues.receiver);
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
  }),
});

module.exports = MessageType;
