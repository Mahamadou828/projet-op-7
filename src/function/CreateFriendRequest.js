import { client } from '..';
import { FriendRequest } from '../graphql/ChatQuery';

export default function CreateFriendRequest(UserId, FriendId) {
  return new Promise((resolve, reject) => {
    client
      .mutate({
        mutation: FriendRequest,
        variables: { UserId, FriendId },
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
