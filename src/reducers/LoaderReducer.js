import { A_SUBMISSION_IS_IN_PROGRESS } from '../constant';

const initialState = {
  Loading: {
    isInProgress: false,
    LoaderId: null,
  },
};

export default function LoaderReducer(state = initialState, action) {
  switch (action.type) {
    case A_SUBMISSION_IS_IN_PROGRESS:
      return {
        Loading: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
