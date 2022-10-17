/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */

// eslint-disable-next-line consistent-return
export async function getTodoList(owner) {
  try {
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await response.json();
  } catch (err) {
    alert(err.message);
  }
}

export async function createTodoItem({
  owner,
  name
}) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}

export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ done: todoItem.done }),
      headers: {
        'Content-type': 'application/json',
      },
    });
}

export function deleteTodoItem({
  element,
  todoItem
}) {
  if (!confirm('Are sure?')) {
    return;
  }
  element.remove();
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`,
    {
      method: 'DELETE',
    });
}
