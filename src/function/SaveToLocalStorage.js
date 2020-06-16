export default function SaveToLocalStorage(data) {
  localStorage.setItem('data', JSON.stringify(data));
}
