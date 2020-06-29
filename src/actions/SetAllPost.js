import { SET_ALL_POST } from '../constant';

export default function SetAllPost(posts) {
  return {
    type: SET_ALL_POST,
    payload: posts,
  };
}
