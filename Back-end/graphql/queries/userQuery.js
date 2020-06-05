const { User } = require('../../databases/databaseInit');
const graphql = require('graphql');
const { GraphQLNonNull, GraphQLString, GraphQLID } = graphql;
const connectType = require('../schema/connectType');
const jwt = require('jsonwebtoken');
const jsonSecret = require('../../auth/secretKey');
const bcrypt = require('bcrypt');

const MutationCreateUser = {
  type: connectType,
  args: {
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    surname: {
      type: GraphQLNonNull(GraphQLString),
    },
    photo: {
      type: GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
  },
  resolve(parentValue, { email, password, name, surname, photo, description }) {
    const user = new User({
      email: email,
      password: password,
      name: name,
      surname: surname,
      photo: photo,
      description: description,
    });

    return user
      .save()
      .then((newUser) => {
        return {
          jwt: jwt.sign({ sub: user.id }, jsonSecret),
          userInfo: newUser,
          access: true,
          error: '',
        };
      })
      .catch(() => {
        return {
          jwt: '',
          userInfo: user,
          access: false,
          error: 'Error we can create your account',
        };
      });
  },
};

const QueryConnectUser = {
  type: connectType,
  args: {
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve(parentValue, { email, password }) {
    return User.findOne({ where: { email: email } })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              return {
                jwt: jwt.sign({ sub: user.id }, jsonSecret, {
                  algorithm: 'RS512',
                }),
                userInfo: user,
                access: true,
                error: '',
              };
            } else {
              return {
                jwt: '',
                userInfo: { email: email, password: password },
                access: false,
                error: 'Wrong password',
              };
            }
          })
          .catch(() => {
            return {
              jwt: '',
              userInfo: { email: email, password: password },
              access: false,
              error: 'Wrong password',
            };
          });
      })
      .catch(() => {
        return {
          jwt: '',
          userInfo: { email: email, password: password },
          access: false,
          error: "That email doesn't exist",
        };
      });
  },
};

const MutationDeleteUser = {
  type: GraphQLString,
  args: {
    id: GraphQLNonNull(GraphQLID),
  },
  resolve(parentValue, { id }) {
    return User.destroy({ where: { id } });
  },
};

module.exports = {
  MutationCreateUser,
  QueryConnectUser,
  MutationDeleteUser,
};
