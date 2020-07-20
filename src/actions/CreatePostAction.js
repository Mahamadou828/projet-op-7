import { client } from '../index';
import {
  ERROR,
  A_SUBMISSION_IS_IN_PROGRESS,
  ADD_POST_TO_LIST,
} from '../constant';
import UploadFile from '../function/uploadFile';
import { CreatePostQuery } from '../graphql/PostQuery';

/**
 * @param {Object} dataPost
 */
export default function CreatePostAction(dataPost) {
  const copy = { ...dataPost };
  return async function (dispatch) {
    if (dataPost.file !== undefined) {
      const file = dataPost.file;
      const respond = await UploadFile(file);
      copy.image = respond.filename;
    }

    client
      .mutate({
        variables: { ...copy },
        mutation: CreatePostQuery,
      })
      .then((response) => {
        const id = response.data.MutationCreatePost.id;
        if (typeof id === 'string') {
          dispatch({
            type: ADD_POST_TO_LIST,
            payload: response.data.MutationCreatePost,
          });
          dispatch({
            type: A_SUBMISSION_IS_IN_PROGRESS,
            payload: {
              number: 0,
              statusLoad: false,
              popUp: true,
              message: 'your post has been create',
            },
          });
        } else {
          dispatch({
            type: ERROR,
            payload: { error: true, text: 'occurent error' },
          });
        }
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
