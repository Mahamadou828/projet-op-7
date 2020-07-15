const graphql = require('graphql');
const { User } = require('../../databases/databaseInit');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;

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
    receiver: {
      type: GraphQLNonNull(User),
      resolve(parentValue, { id }) {
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
