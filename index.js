/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
// import { createTodoApp } from './todo-app/view.js';
import { currentStorage } from './todo-app/storagebutton.js';
import { initialSet } from './todo-app/initialset.js';

const currentOwner = localStorage.getItem('owner');
let storage = initialSet();
let title = '';

(async () => {
  const btnChangeStorage = document.getElementById('button__storage-change');
  async function loadApp() {
    const appHeader = document.getElementById('appheader');
    const appForm = document.getElementById('appform');
    const appList = document.getElementById('applist');
    // Убираем старый заголовок
    if (appHeader) {
      appHeader.remove();
    }

    // Убираем старую форму
    if (appForm) {
      appForm.remove();
    }

    // Убираем старый список дел
    if (appList) {
      appList.remove();
    }
    if (currentOwner === 'My') {
      title = 'My todos';
    }
    if (currentOwner === 'Dad') {
      title = 'Dads todos';
    }
    if (currentOwner === 'Mom') {
      title = 'Moms todos';
    }
    storage = localStorage.getItem('storage');
    if (storage === 'server') {
      const { createTodoApp } = await import('./todo-app/view.js');
      const {
        getTodoList,
        createTodoItem,
        switchTodoItemDone,
        deleteTodoItem,
      } = await import('./todo-app/api.js');
      const todoItemList = await getTodoList(currentOwner);
      createTodoApp(document.getElementById('todo-app'),
        {
          title,
          owner: currentOwner,
          todoItemList,
          onCreateFormSubmit: createTodoItem,
          onDoneClick: switchTodoItemDone,
          onDeleteClick: deleteTodoItem,
        });
    } else {
      const { createTodoApp } = await import('./todo-app/view.js');
      const {
        getLocalTodoList,
        createLocalTodoItem,
        switchLocalTodoItemDone,
        deleteLocalTodoItem,
      } = await import('./todo-app/localstorage.js');
      const todoItemList = await getLocalTodoList(currentOwner);
      createTodoApp(document.getElementById('todo-app'),
        {
          title,
          owner: currentOwner,
          todoItemList,
          onCreateFormSubmit: createLocalTodoItem,
          onDoneClick: switchLocalTodoItemDone,
          onDeleteClick: deleteLocalTodoItem,
        });
    }
  }
  btnChangeStorage.addEventListener('click', currentStorage);
  btnChangeStorage.addEventListener('click', loadApp);
  loadApp();
})();
