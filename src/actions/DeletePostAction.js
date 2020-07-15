import {
  A_SUBMISSION_IS_IN_PROGRESS,
  REMOVE_POST_OF_LIST,
  ERROR,
} from '../constant';
import { client } from '..';
import { DeletePostQuery } from '../graphql/PostQuery';

/**
 * @param {Number} id l'id du post
 */
export default function DeletePostAction(id) {
  return function (dispatch) {
    dispatch({
      type: A_SUBMISSION_IS_IN_PROGRESS,
      payload: {
        number: 4,
        statusLoad: true,
        popUp: false,
        message: '',
      },
    });

    client
      .mutate({
        mutation: DeletePostQuery,
        variables: { id },
      })
      .then((respond) => {
        dispatch({
          type: REMOVE_POST_OF_LIST,
          payload: respond.data.MutationDeletePost,
        });
        dispatch({
          type: A_SUBMISSION_IS_IN_PROGRESS,
          payload: {
            number: 0,
            statusLoad: false,
            popUp: true,
            message: 'Post has been deleted',
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR,
          payload: { error: true, text: error.message },
        });
      });
  };
}
