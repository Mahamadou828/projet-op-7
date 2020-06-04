import { LOGIN } from '../RequestRoute';
import { SIGN_IN } from '../constant';

export function LogInAction(userInfo) {
  //DoRequest

  return {
    type: LOGIN,
    payload: userInfo,
  };
}

export function SignUpAction(userInfo) {
  return {
    type: SIGN_IN,
    payload: userInfo,
  };
}
