import { client } from '../index';
import { ERROR, A_SUBMISSION_IS_IN_PROGRESS } from '../constant';
import CreatePostQuery from '../graphql/CreatePost';
import UploadFile from '../function/uploadFile';

/**
 * @param {Object} dataPost
 */
export default function CreatePostAction(dataPost) {
  return async function (dispatch) {
    if (dataPost.file !== undefined) {
      const file = dataPost.file;
      dataPost.image = await UploadFile(file);
    }

    client
      .mutate({
        variables: { ...dataPost },
        mutation: CreatePostQuery,
      })
      .then((response) => {
        const id = response.data.MutationCreatePost.id;
        if (typeof id === 'string') {
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
            text: 'Internal Server Error, please try later(((',
          },
        });
      });
  };
}
