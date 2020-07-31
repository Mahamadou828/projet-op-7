import { client } from '..';
import { GetSession } from '../graphql/SessionQuery';
import { SET_ACCESS } from '../constant';

export default function GetSessionAction() {
  return function (dispatch) {
    return new Promise((resolve) => {
      client
        .query({
          query: GetSession,
        })
        .then(({ data }) => {
          const { access, error, jwt, userInfo } = data.QueryGetSessionToken;
          if (access) {
            dispatch({
              type: SET_ACCESS,
              payload: { access, error, accessData: { userInfo, jwt } },
            });
          }
          resolve(access);
        })
        .catch(() => {
          resolve(false);
        });
    });
  };
}
