import { A_SUBMISSION_IS_IN_PROGRESS } from '../constant';

const initialState = {
  statusLoad: false,
  number: 0,
  popUp: false,
  message: '',
};

export default function LoaderReducer(state = initialState, action) {
  switch (action.type) {
    case A_SUBMISSION_IS_IN_PROGRESS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
