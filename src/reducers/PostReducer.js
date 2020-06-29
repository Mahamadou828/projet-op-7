import { SET_ALL_POST } from '../constant';

const initialState = {
  posts: [],
};

export default function PostReducer(state = initialState, payload) {
  switch (payload.type) {
    case SET_ALL_POST:
      return {
        posts: payload.posts,
      };
      break;
    default:
      return state;
  }
}
