const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Connection = require('../databaseConnection');
const PostSchema = require('./PostSchema');
const { Post } = require('./databaseInit');
const { TRUE } = require('node-sass');

class PostAppreciation extends Model {}

PostAppreciation.init(
  {
    like: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    dislike: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize: Connection, modelName: 'PostRealation' }
);

PostAppreciation.beforeSave((post, option) => {
  return new Promise((resolve, reject) => {
    if (updateLikeAndDislikeNumber(post)) {
      resolve(true);
    } else {
      reject('Internal Error');
    }
  });
});

PostAppreciation.beforeBulkUpdate((post, option) => {
  return new Promise((resolve, reject) => {
    if (updateLikeAndDislikeNumber(post)) {
      resolve(true);
    } else {
      reject('Internal Error');
    }
  });
});

async function updateLikeAndDislikeNumber(post) {
  const {
    attributes: { like, dislike },
    where: { PostId },
  } = post;
  let numLike = 0,
    numDislike = 0;

  numLike = await PostAppreciation.count({
    where: { PostId, like: true },
  });

  numDislike = await PostAppreciation.count({
    where: { PostId, dislike: true },
  });

  if (like) {
    numLike += 1;
  } else if (dislike) {
    numDislike += 1;
  }

  const result = await PostSchema.update(
    { numLike, numDislike },
    {
      where: { id: PostId },
    }
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return result;
}

module.exports = PostAppreciation;
