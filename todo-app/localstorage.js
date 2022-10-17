/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

/* eslint-disable linebreak-style */
export async function getLocalTodoList(currentOwner) {
  const owner = currentOwner;
  let result = localStorage.getItem(owner);
  result = JSON.parse(result);
  return result;
}

export async function createLocalTodoItem({
  owner,
  name
}) {
  const todoItem = {
    name,
    done: false,
    id: Date.now()
      .toString(),
    owner,
  };
  let result = localStorage.getItem(owner);
  result = JSON.parse(result);
  if (result === null) {
    result = [];
  }
  result.push(todoItem);
  localStorage.setItem(owner, JSON.stringify(result));

  return todoItem;
}

export function switchLocalTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  const currentOwner = localStorage.getItem('owner');
  let result = localStorage.getItem(currentOwner);
  result = JSON.parse(result);
  for (const i of result) {
    if (i.id === todoItem.id) {
      i.done = todoItem.done;
    }
  }
  localStorage.setItem(currentOwner, JSON.stringify(result));
}

export function deleteLocalTodoItem({
  element,
  todoItem
}) {
  if (!confirm('Are you sure?')) {
    return;
  }
  element.remove();
  const currentOwner = localStorage.getItem('owner');
  let result = localStorage.getItem(currentOwner);
  result = JSON.parse(result);
  for (const i in result) {
    if (result[i].id === todoItem.id) {
      result.splice(i, 1);
    }
  }
  localStorage.setItem(currentOwner, JSON.stringify(result));
}
