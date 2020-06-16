import { ERROR } from '../constant';

const initialState = {
  error: false,
  text: '',
};

export default function ErrorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
