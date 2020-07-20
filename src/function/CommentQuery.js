import { client } from '..';
import { GetCommentOfAnPost, AddComment } from '../graphql/PostQuery';

export function getComment(id) {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: GetCommentOfAnPost,
        variables: { id },
      })
      .then((data) => {
        resolve(data.data.QueryGetOnePost.comments);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @param {String} PostId
 * @param {String} UserId
 * @param {String} content
 */
export function addComment(PostId, UserId, content) {
  return new Promise((resolve, reject) => {
    client
      .mutate({
        mutation: AddComment,
        variables: { PostId, UserId, content },
      })
      .then((data) => {
        resolve(data.data.MutationAddComment);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
