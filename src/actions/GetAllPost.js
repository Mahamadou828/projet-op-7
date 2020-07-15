import { SET_ALL_POST, ERROR } from '../constant';
import { client } from '../index';
import { GetAllPostQuery } from '../graphql/PostQuery';

export default function GetAllPost() {
  return function (dispatch) {
    client
      .query({
        query: GetAllPostQuery,
      })
      .then((data) => {
        const posts = data.data.QueryGetAllPost;
        dispatch({
          type: SET_ALL_POST,
          payload: posts,
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
