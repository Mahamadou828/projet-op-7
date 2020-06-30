const { PostAppreciation } = require('../../databases/databaseInit');
const graphql = require('graphql');
const PostAppreciationGraphQL = require('../schema/PostRelationType');
const { GraphQLNonNull, GraphQLID, GraphQLBoolean } = graphql;
const { defaultAppreciationPost } = require('../defaultObjetSchema/index');

const QueryGetUserAppreciationOfAnPost = {
  type: PostAppreciationGraphQL,
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    PostId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },

  resolve(parentValue, { UserId, PostId }) {
    return new Promise((resolve, reject) => {
      PostAppreciation.findOne({
        where: { UserId, PostId },
      })
        .then((appreciate) => {
          if (appreciate) {
            resolve(appreciate);
          } else {
            resolve(defaultAppreciationPost);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const MutationUpdateAppreciation = {
  type: PostAppreciationGraphQL,
  args: {
    UserId: {
      type: GraphQLNonNull(GraphQLID),
    },
    PostId: {
      type: GraphQLNonNull(GraphQLID),
    },
    like: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    dislike: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  },
  resolve(parentValue, { UserId, PostId, like, dislike }) {
    return new Promise((resolve, reject) => {
      PostAppreciation.findOne({
        where: { UserId, PostId },
      }).then((appreciate) => {
        if (appreciate) {
          PostAppreciation.update(
            { like, dislike },
            { where: { UserId, PostId } }
          )
            .then(() => {
              resolve(appreciate);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const newPostAppreciation = new PostAppreciation({
            like,
            dislike,
            UserId,
            PostId,
          });
          newPostAppreciation
            .save()
            .then((savingAppreciate) => {
              resolve(savingAppreciate);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    });
  },
};

module.exports = {
  QueryGetUserAppreciationOfAnPost,
  MutationUpdateAppreciation,
};
