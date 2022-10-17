/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

/* eslint-disable linebreak-style */
export function initialSet() {
  let currentActiveStorage = localStorage.getItem('storage');
  const changeBtn = document.getElementById('button__storage-change');
  if (currentActiveStorage === null) {
    currentActiveStorage = 'local';
    localStorage.setItem('storage', currentActiveStorage);
    changeBtn.textContent = 'Switch to server storage';
  }

  if (currentActiveStorage === 'local') {
    changeBtn.textContent = 'Switch to server storage';
  } else {
    changeBtn.textContent = 'Switch to local storage (browser)';
  }
  return currentActiveStorage;
}
