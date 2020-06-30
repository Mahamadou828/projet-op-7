import { SET_ALL_POST, ERROR } from '../constant';
import { client } from '../index';
import getAllPost from '../graphql/GetAllPosts';

export default function GetAllPost() {
  return function (dispatch) {
    client
      .query({
        query: getAllPost,
      })
      .then((data) => {
        const posts = data.data.QueryGetAllPost;
        dispatch({
          type: SET_ALL_POST,
          payload: posts,
        });
      })
      .catch(() => {
        dispatch({
          type: ERROR,
          payload: { error: true, text: 'Internal Server error((' },
        });
      });
  };
}
