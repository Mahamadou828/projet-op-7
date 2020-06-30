const { A_SUBMISSION_IS_IN_PROGRESS } = require('../constant');

/**
 * @param {Number} number l'identifiant du loader qui sera afficher
 * @param {Boolean} statusLoad est ce que le chargement est en cours
 * @param {Boolean} popUp doit-on afficher un popUp de message a l'ecran
 * @param {String} message le message contenu dans le popUp
 */
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
