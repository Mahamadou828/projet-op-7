import { client } from '../index';
import ConnectUser from '../graphql/ConnectUser';
import { ERROR, SET_ACCESS, A_SUBMISSION_IS_IN_PROGRESS } from '../constant';

export default function LogInAction(userInfo) {
  return function (dispatch) {
    const { password, email, remenber } = userInfo;
    client
      .query({
        variables: { password, email },
        query: ConnectUser,
      })
      .then((data) => {
        const { access, error, jwt, userInfo } = data.data.ConnectUser;
        if (access) {
          dispatch({
            type: SET_ACCESS,
            payload: { access, error, accessData: { userInfo, jwt } },
          });
          dispatch({
            type: A_SUBMISSION_IS_IN_PROGRESS,
            payload: {
              number: 0,
              statusLoad: false,
              popUp: false,
              message: '',
            },
          });
        } else {
          dispatch({ type: ERROR, payload: { error: true, text: error } });
        }
      })
      .catch(() => {
        dispatch({
          type: ERROR,
          payload: {
            error: true,
            text: 'Internal Server Error, please try later(((',
          },
        });
      });
  };
}
