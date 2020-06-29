const { A_SUBMISSION_IS_IN_PROGRESS } = require('../constant');

export default function LoaderAction(
  number,
  statusLoad,
  popUp = false,
  message = ''
) {
  return {
    type: A_SUBMISSION_IS_IN_PROGRESS,
    payload: { statusLoad, number, popUp, message },
  };
}
