import { SetAppreciation } from '../graphql/PostAppreciationQuery';
import { client } from '..';

export default function SendAppreciation(param) {
  return new Promise((resolve, reject) => {
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
          if (id !== undefined) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      )
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
