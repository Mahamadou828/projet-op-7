const { User, Post } = require('../../databases/databaseInit');
const graphql = require('graphql');
const { GraphQLNonNull, GraphQLString, GraphQLID } = graphql;
const connectType = require('../schema/connectType');
const jwt = require('jsonwebtoken');
const { jsonSecret } = require('../../auth/secretKey');
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
      email,
      password,
      name,
      surname,
      photo,
      description,
    });

    return user
      .save()
      .then((newUser) => {
        return {
          jwt: jwt.sign({ sub: `${user.id}|${user.email}` }, jsonSecret),
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
    const defaultUser = {
      email,
      password,
      name: '',
      surname: '',
      photo: '',
      description: '',
    };
    return new Promise((resolve, reject) => {
      User.findOne({ where: { email: email } })
        .then((user) => {
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              console.log(result);
              if (result) {
                resolve({
                  jwt: jwt.sign(
                    { sub: `${user.id}|${user.email}` },
                    jsonSecret
                  ),
                  userInfo: user,
                  access: true,
                  error: '',
                });
              } else {
                resolve({
                  jwt: '',
                  userInfo: {
                    email: email,
                    password: password,
                    name: '',
                    surname: '',
                    photo: '',
                    description: '',
                  },
                  access: false,
                  error: 'Wrong password',
                });
              }
            })
            .catch(() => {
              resolve({
                jwt: '',
                userInfo: defaultUser,
                access: false,
                error: 'Wrong password',
              });
            });
        })
        .catch(() => {
          resolve({
            jwt: '',
            userInfo: defaultUser,
            access: false,
            error: "That email doesn't exist",
          });
        });
    });
  },
};

const MutationDeleteUser = {
  type: GraphQLString,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, { id, password }) {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { id } })
        .then((user) => {
          if (!user) {
            resolve("This user doesn't exist");
          } else {
            bcrypt
              .compare(password, user.password)
              .then((result) => {
                if (result) {
                  User.destroy({ where: { id } })
                    .then(() => {
                      Post.destroy({ where: { UserId: id } })
                        .then(() => {
                          resolve('User Deleted');
                        })
                        .catch((error) => {
                          reject(error);
                        });
                    })
                    .catch((error) => {
                      reject(error);
                    });
                } else {
                  resolve('wrong password');
                }
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = {
  MutationCreateUser,
  QueryConnectUser,
  MutationDeleteUser,
};
