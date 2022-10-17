/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */

/* eslint-disable func-names */

/* eslint-disable prefer-arrow-callback */
function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.setAttribute('id', 'appheader');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  form.setAttribute('id', 'appform');
  input.classList.add('form-control');
  input.placeholder = 'Enter new todo';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.type = 'submit';
  button.disabled = true;
  button.textContent = 'Add todo';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);
  input.addEventListener('input', function () {
    if (input.value === '') {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });
  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  list.setAttribute('id', 'applist');
  return list;
}

function createTodoItemElement(todoItem, {
  onDone,
  onDelete
}) {
  const doneClass = 'list-group-item-success';
  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (todoItem.done) {
    item.classList.add(doneClass);
  }
  item.textContent = todoItem.name;
  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Done';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Delete';

  doneButton.addEventListener('click', function () {
    onDone({
      todoItem,
      element: item
    });
    item.classList.toggle(doneClass, todoItem.done);
  });

  deleteButton.addEventListener('click', function () {
    onDelete({
      todoItem,
      element: item
    });
  });
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);
  return item;
}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const handlers = {
    onDone: onDoneClick,
    onDelete: onDeleteClick
  };
  if (todoItemList === null) {
    // eslint-disable-next-line no-param-reassign
    todoItemList = [];
  }
  todoItemList.forEach((todoItem) => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);
  todoItemForm.form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });

    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
  });
}

export { createTodoApp };
