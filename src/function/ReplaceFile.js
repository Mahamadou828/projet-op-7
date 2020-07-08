import { BASE_ROUTE } from '..';

export default function ReplaceFile(oldFile, newFile) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_ROUTE}/file/replaceFile`;
    const formData = new FormData();
    formData.append('images', newFile);
    formData.append('oldFile', oldFile);
    const myInit = {
      method: 'POST',
      body: formData,
      mode: 'cors',
      cache: 'default',
    };

    fetch(url, myInit)
      .then((data) => {
        resolve(data.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}
