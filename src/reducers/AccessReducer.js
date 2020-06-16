import { SET_ACCESS } from '../constant';

const initialState = {
  access: false,
  error: '',
  accessData: {
    userInfo: {},
    jwt: '',
  },
};

export default function AccessReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS:
      return {
        ...action.payload,
      };
      break;
    default:
      return state;
  }
}
