const todoInput = document.querySelector('.todo-input');
const myForm = document.querySelector('.todo-form');
const list = document.querySelector('.todo-list');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  //todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //create LI
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.appendChild(document.createTextNode(`${todoInput.value}`));
  todoDiv.appendChild(newTodo);

  //create completed button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  //completeButton.innerText('Complete');
  todoDiv.appendChild(completeButton);

  //create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  todoDiv.appendChild(deleteButton);

  //create edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fa fa-pencil" ></i>';
  todoDiv.appendChild(editButton);

  //add new Task
  list.appendChild(todoDiv);
  //clear todo input
  todoInput.value = '';
}
