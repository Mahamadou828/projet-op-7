import { SET_ACCESS } from '../constant';

/**
 * @param {Object} param
 */
export default function AccessAction({ access, jwt, error, userInfo }) {
  return {
    type: SET_ACCESS,
    payload: {
      access,
      error,
      accessData: {
        userInfo,
        jwt,
      },
    },
  };
}
