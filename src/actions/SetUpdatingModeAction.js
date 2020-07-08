import { UPDATE_POST } from '../constant';

/**
 * @param {object}
 * @param {Boolean} open doit on ouvre le mode update ou pas
 */
export default function SetUpdatingModeAction({ post, open }) {
  return {
    type: UPDATE_POST,
    payload: {
      open,
      post,
    },
  };
}
