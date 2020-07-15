import { GET_ALL_CONTACT } from '../constant';

const initialState = {
  contact: [],
};

export default function ContactReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONTACT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
