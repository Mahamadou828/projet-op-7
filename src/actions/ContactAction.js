import { client } from '..';
import { GetAllContact } from '../graphql/ChatQuery';
import {
  ERROR,
  GET_ALL_CONTACT,
  A_SUBMISSION_IS_IN_PROGRESS,
} from '../constant';

export default function ContactAction(UserId) {
  return function (dispatch) {
    client
      .query({
        query: GetAllContact,
        variables: { UserId: UserId },
      })
      .then((data) => {
        dispatch({
          type: GET_ALL_CONTACT,
          payload: { contact: data.data.QueryGetAllContact },
        });
        dispatch({
          type: A_SUBMISSION_IS_IN_PROGRESS,
          payload: {
            number: 0,
            statusLoad: false,
            popUp: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: {
            error: true,
            text: error.message,
          },
        });
      });
  };
}
