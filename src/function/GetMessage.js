import { client } from '..';
import { GetAllMessage } from '../graphql/ChatQuery';

export default function GetMessage(UserId, contactId) {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: GetAllMessage,
        variables: { UserId, contactId },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
