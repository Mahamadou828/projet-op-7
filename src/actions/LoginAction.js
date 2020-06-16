import { client } from '../index';
import SaveToLocalStorage from '../function/SaveToLocalStorage';
import ConnectUser from '../graphql/ConnectUser';
import { ERROR } from '../constant';

export default function LogInAction(userInfo) {
  return function (dispatch) {
    const { password, email, remenber } = userInfo;
    client
      .query({
        variables: { password, email },
        query: ConnectUser,
      })
      .then((data) => {
        console.log(data);
        const { access, error, jwt, userInfo } = data.data.ConnectUser;
        if (access) {
          dispatch({
            type: SET_ACCESS,
            payload: { access, error, accessData: { userInfo, jwt } },
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
