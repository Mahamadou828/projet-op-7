import { ERROR } from '../constant';

export default function ErrorAction(error, text) {
  return {
    type: ERROR,
    payload: { error, text },
  };
}
