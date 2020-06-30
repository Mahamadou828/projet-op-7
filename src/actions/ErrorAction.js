import { ERROR } from '../constant';

/**
 * @param {Boolean} error il y a t'il une erreur
 * @param {String} text le texte de l'erreur
 */
export default function ErrorAction(error, text) {
  return {
    type: ERROR,
    payload: { error, text },
  };
}
