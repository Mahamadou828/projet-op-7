import { SET_ALL_POST } from '../constant';

const initialState = {
  posts: [],
};

export default function PostReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_POST:
      return {
        posts: action.payload,
      };
      break;
    default:
      return state;
  }
}
