import { createSelector } from 'reselect';
import lodash from 'lodash';

/**
 * @param {Array} posts
 * @param {Number} id
 */
export const findPostById = (posts, id) => {
  return lodash.filter(posts, (post) => {
    return parseInt(post.id) === id;
  })[0];
};
