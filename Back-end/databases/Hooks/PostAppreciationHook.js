const Post = require('../PostSchema');
const PostAppreciation = require('../PostAppreciation');

PostAppreciation.afterSave((post, _) => {
  return new Promise((resolve, reject) => {
    GetLikeDislikeNumber(post)
      .then((postData) => {
        updatePost(postData)
          .then((_) => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
});

PostAppreciation.afterBulkUpdate((post, _) => {
  return new Promise((resolve, reject) => {
    GetLikeDislikeNumber(post)
      .then((postData) => {
        updatePost(postData)
          .then((_) => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
});

function GetLikeDislikeNumber(post) {
  const {
    where: { PostId },
  } = post;
  return new Promise((resolve, reject) => {
    try {
      PostAppreciation.count({
        where: { PostId, like: true },
      }).then((like) => {
        PostAppreciation.count({
          where: { PostId, dislike: true },
        }).then((dislike) => {
          resolve({ numLike: like, numDislike: dislike, PostId });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function updatePost({ numLike, numDislike, PostId }) {
  return new Promise((resolve, reject) => {
    Post.update(
      { numLike, numDislike },
      {
        where: { id: PostId },
      }
    )
      .then((update) => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
