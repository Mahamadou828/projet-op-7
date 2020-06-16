import { BASE_ROUTE } from '../index';

export default function UploadFile(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('images', file);
    const url = `${BASE_ROUTE}/file/upload/`;
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
