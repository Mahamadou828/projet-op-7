import { SET_ACCESS, ERROR } from '../constant';
import { client } from '../index';
import CREATE_USER from '../graphql/CreateUser';
import UploadFile from '../function/uploadFile';
import SaveToLocalStorage from '../function/SaveToLocalStorage';

export default function SignUpAction(userInfo) {
  const {
    name,
    surname,
    password,
    email,
    avatar,
    description,
    remenber,
  } = userInfo;
  return function (dispatch) {
    UploadFile(avatar)
      .then((respond) => {
        const photo = respond.filename;
        client
          .mutate({
            variables: { email, password, name, surname, photo, description },
            mutation: CREATE_USER,
          })
          .then((data) => {
            const { jwt, error, access, userInfo } = data.data.CreateUser;
            console.log(jwt, error, access, userInfo);
            if (access) {
              dispatch({
                type: SET_ACCESS,
                payload: { access, error, accessData: { userInfo, jwt } },
              });
            } else {
              dispatch({
                type: ERROR,
                payload: {
                  error: true,
                  text: `${error}, it's seen it already exist`,
                },
              });
            }
          })
          .catch((error) => {
            dispatch({ type: ERROR, payload: { error: true, text: error } });
          });
      })
      .catch((error) => {
        dispatch({ type: ERROR, payload: { error: true, text: error } });
      });
  };
}
