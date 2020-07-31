const { User, Post, Contact } = require('../../databases/databaseInit');
const graphql = require('graphql');
const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = graphql;
const connectType = require('../schema/connectType');
const jwt = require('jsonwebtoken');
const { jsonSecret } = require('../../auth/secretKey');
const bcrypt = require('bcrypt');
const UserType = require('../schema/userType');
const { Op } = require('sequelize');

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
    openSession: {
      type: GraphQLBoolean,
    },
  },
  resolve(
    _,
    { email, password, name, surname, photo, description, openSession },
    { req }
  ) {
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
        const resolver = {
          jwt: jwt.sign({ sub: `${user.id}|${user.email}` }, jsonSecret),
          userInfo: newUser,
          access: true,
          error: '',
        };
        if (openSession) {
          req.session.token = resolver.jwt;
          req.session.cookie.token = resolver.jwt;
        }
        return resolver;
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
    openSession: {
      type: GraphQLBoolean,
    },
  },
  resolve(_, { email, password, openSession }, { req }) {
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
              if (result) {
                const resolver = {
                  jwt: jwt.sign(
                    { sub: `${user.id}|${user.email}` },
                    jsonSecret
                  ),
                  userInfo: user,
                  access: true,
                  error: '',
                };
                if (openSession) {
                  console.log('ouvre la session');
                  req.session.token = resolver.jwt;
                  req.session.cookie.token = resolver.jwt;
                }
                resolve(resolver);
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
  resolve(_, { id, password }) {
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

const QueryGetAllUser = {
  type: new GraphQLList(UserType),
  args: {
    UserId: {
      type: GraphQLID,
    },
  },
  resolve(_, { UserId }) {
    return new Promise((resolve, reject) => {
      Contact.findOne({
        where: {
          UserId,
        },
      })
        .then((contact) => {
          const { contactList, FriendRequestList, BlockedUserList } = contact;
          const notIn = [
            ...JSON.parse(contactList),
            ...JSON.parse(FriendRequestList),
            ...JSON.parse(BlockedUserList),
            UserId,
          ];
          User.findAll({
            where: {
              id: {
                [Op.notIn]: notIn,
              },
            },
          })
            .then((users) => {
              resolve(users);
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
  MutationCreateUser,
  QueryConnectUser,
  MutationDeleteUser,
  QueryGetAllUser,
};
