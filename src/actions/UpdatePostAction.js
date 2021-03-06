import ReplaceFile from '../function/ReplaceFile';
import { client } from '..';
import {
  A_SUBMISSION_IS_IN_PROGRESS,
  ERROR,
  CHANGE_A_POST_FROM_LIST,
  UPDATE_POST,
} from '../constant';
import { UpdatePostQuery } from '../graphql/PostQuery';
import UploadFile from '../function/uploadFile';

export default function UpdatePostAction(newPost, oldPost) {
  const copy = { ...newPost };
  return async function (dispatch) {
    if (newPost.file !== undefined && oldPost.image.length > 0) {
      const file = newPost.file;
      const respond = await ReplaceFile(oldPost.image, file);
      copy.image = respond.filename;
    } else if (newPost.file !== undefined && oldPost.image.length <= 0) {
      const file = newPost.file;
      const respond = await UploadFile(file);
      copy.image = respond.filename;
    }
    delete copy.file;
    client
      .mutate({
        mutation: UpdatePostQuery,
        variables: { ...copy },
      })
      .then((post) => {
        dispatch({
          type: UPDATE_POST,
          payload: { open: false, post: {} },
        });
        dispatch({
          type: CHANGE_A_POST_FROM_LIST,
          payload: post.data.MutationUpdatePost,
        });
        dispatch({
          type: A_SUBMISSION_IS_IN_PROGRESS,
          payload: {
            number: 0,
            statusLoad: false,
            popUp: true,
            message: 'your post has been update',
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
