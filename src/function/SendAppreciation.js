import { SetAppreciation } from '../graphql/PostAppreciationQuery';
import { client } from '..';

export default function SendAppreciation(param) {
  return new Promise((reject, resolve) => {
    client
      .mutate({
        variables: { ...param },
        mutation: SetAppreciation,
      })
      .then(
        ({
          data: {
            MutationUpdateAppreciation: { id },
          },
        }) => {
          console.log(id);
          if (id !== undefined) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
