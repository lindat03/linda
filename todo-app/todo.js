const todoInput = document.querySelector('.todo-input');
const myForm = document.querySelector('.todo-form');
const list = document.querySelector('.todo-list');

//event listeners
myForm.addEventListener('submit', onSubmit);
list.addEventListener('click', todoAction);

function onSubmit(e) {
  e.preventDefault();
  createNewToDo('newTask');
}

function createNewToDo(direction) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //create LI
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');

  if (direction === 'newTask') {
    newTodo.innerText = todoInput.value;
  } else {
    newTodo.innerText = direction;
  }
  todoDiv.appendChild(newTodo);

  //create completed button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);

  //create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);

  //create edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fa fa-pencil" ></i>';
  editButton.classList.add('edit-btn');
  todoDiv.appendChild(editButton);

  //add new Task
  list.appendChild(todoDiv);
  //clear todo input
  todoInput.value = '';
}

function todoAction(e) {
  const item = e.target;
  const task = item.parentElement;
  if (item.classList[0] === 'delete-btn') {
    task.remove();
  } else if (item.classList[0] === 'complete-btn') {
    task.childNodes[0].classList.add('strikethrough');
    task.childNodes[1].remove();
    task.childNodes[2].remove();
  } else if (item.classList[0] === 'edit-btn') {
    removeAllChildNodes(task);
    editExistingTask(task);
  }
}

function editExistingTask(parent) {
  const editDiv = document.createElement('div');
  editDiv.classList.add('edit-div');
  //make edit box
  const editText = document.createElement('input');
  editText.type = 'text';
  editText.classList.add('edit-text');
  //make complete box
  const editComplete = document.createElement('button');
  editComplete.type = 'submit';
  editComplete.classList.add('edit-complete-btn');
  editComplete.innerHTML = '<i class="fas fa-check"></i>';
  //add everything on screen
  editDiv.appendChild(editText);
  editDiv.appendChild(editComplete);
  parent.appendChild(editDiv);
  //complete event
  editDiv.addEventListener('click', editCompleteSubmit);
}

function editCompleteSubmit(e) {
  const item = e.target;
  const task = item.parentElement;
  const text = task.firstChild.value;
  if (item.classList[0] === 'edit-complete-btn') {
    removeAllChildNodes(task);
    createNewToDo(text);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
