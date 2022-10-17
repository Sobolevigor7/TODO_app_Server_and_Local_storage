/* eslint-disable import/prefer-default-export */

/* eslint-disable linebreak-style */

export function currentStorage() {
  let currentActiveStorage = localStorage.getItem('storage');
  const changeBtn = document.getElementById('button__storage-change');
  if (currentActiveStorage === undefined) {
    currentActiveStorage = 'local';
    localStorage.setItem('storage', currentActiveStorage);
    changeBtn.textContent = 'Switch to server storage';
  }

  if (currentActiveStorage === 'local') {
    currentActiveStorage = 'server';
    localStorage.setItem('storage', currentActiveStorage);
    changeBtn.textContent = 'Switch to local storage (browser)';
  } else {
    currentActiveStorage = 'local';
    localStorage.setItem('storage', currentActiveStorage);
    changeBtn.textContent = 'Switch to server storage';
  }
  return currentActiveStorage;
}
