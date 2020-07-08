import {
  SET_ALL_POST,
  CHANGE_A_POST_FROM_LIST,
  ADD_POST_TO_LIST,
  REMOVE_POST_OF_LIST,
} from '../constant';
import lodash from 'lodash';

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
    case ADD_POST_TO_LIST:
      state.posts.push(action.payload);
      const newArray = state.posts.reverse();
      return {
        posts: newArray,
      };
      break;
    case REMOVE_POST_OF_LIST:
      return {
        posts: lodash.filter(state.posts, (o) => {
          return o.id !== action.payload;
        }),
      };
      break;
    case CHANGE_A_POST_FROM_LIST:
      const newState = lodash.filter(state.posts, (o) => {
        return o.id !== action.payload.id;
      });
      newState.push(action.payload);
      return {
        posts: newState.reverse(),
      };
      break;
    default:
      return state;
  }
}
