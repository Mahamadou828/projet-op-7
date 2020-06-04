import { A_SUBMISSION_IS_IN_PROGRESS } from '../constant';

export function SubmissionIsInProgress(LoaderId = null, IsInProgress = false) {
  return {
    type: A_SUBMISSION_IS_IN_PROGRESS,
    payload: {
      LoaderId: LoaderId,
      IsInProgress: IsInProgress,
    },
  };
}
