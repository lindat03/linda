const todoInput = document.querySelector('.todo-input');
const myForm = document.querySelector('.todo-form');
const list = document.querySelector('.todo-list');
const errorMessage = document.querySelector('.error-msg');

//event listeners
myForm.addEventListener('submit', onSubmit);
list.addEventListener('click', todoAction);

function onSubmit(e) {
  e.preventDefault();
  if (todoInput.value === '') {
    showErrorMessage();
  } else {
    createNewToDo('newTask');
  }
}

function createEditButton() {
  const editButton = document.createElement('button');
  editButton.innerHTML = '<img src="icons/edit.png" alt="" />';
  editButton.classList.add('edit-btn');
  return editButton;
}

function createNewToDo(direction) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //create completed button
  const completeButton = document.createElement('input');
  completeButton.type = 'checkbox';
  completeButton.innerHTML = completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);

  //create SPAN
  const newTodo = document.createElement('span');
  newTodo.classList.add('todo-item');
  if (direction === 'newTask') {
    newTodo.innerText = todoInput.value;
  } else {
    newTodo.innerText = direction;
  }
  todoDiv.appendChild(newTodo);

  //create delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML =
    '<img src="icons/remove.png" alt="" class="delete-img"/>';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);

  //create edit button
  const editButton = createEditButton();
  todoDiv.appendChild(editButton);

  //add new Task
  list.appendChild(todoDiv);
  //clear todo input
  todoInput.value = '';
}

function todoAction(e) {
  const item = e.target;
  const task = item.parentElement;
  if (item.classList[0] === 'delete-img') {
    task.parentElement.remove();
  } else if (item.classList[0] === 'complete-btn') {
    if (task.childNodes[1].nodeName === 'SPAN') {
      if (item.checked == true) {
        task.childNodes[1].classList.add('gray-out');
        task.childNodes[2].classList.add('delete-btn-checked');
        task.childNodes[3].remove();
      } else {
        task.childNodes[1].classList.remove('gray-out');
        task.childNodes[2].classList.remove('delete-btn-checked');
        const editButton = createEditButton();
        task.appendChild(editButton);
      }
    }
  } else if (item.classList[0] === 'edit-btn') {
    editExistingTask(task);
  }
}

function editExistingTask(task) {
  task.childNodes[0].disabled = true;
  const previousValue = task.childNodes[1].innerText;
  task.removeChild(task.childNodes[1]);

  const editText = document.createElement('input');
  editText.type = 'text';
  editText.classList.add('edit-text');
  editText.value = previousValue;
  task.insertBefore(editText, task.children[1]);

  const editComplete = document.createElement('button');
  editComplete.type = 'submit';
  editComplete.classList.add('edit-complete-btn');
  editComplete.innerHTML = '<img src="icons/tick-mark.png" alt="" />';
  task.removeChild(task.childNodes[3]);
  task.appendChild(editComplete);

  editText.focus();

  editComplete.addEventListener('click', editCompleteSubmit);
  editText.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      editComplete.click();
    }
  });
}

function editCompleteSubmit(e) {
  const item = e.target;
  const task = item.parentElement;
  const text = task.childNodes[1].value;
  if (text === '') {
    showErrorMessage();
  } else {
    const newTodo = document.createElement('span');
    newTodo.classList.add('todo-item');
    newTodo.innerText = text;
    task.removeChild(task.childNodes[1]);
    task.insertBefore(newTodo, task.childNodes[1]);
    task.removeChild(task.childNodes[3]);

    const editButton = createEditButton();
    task.appendChild(editButton);
    task.childNodes[0].disabled = false;
  }
}

function showErrorMessage() {
  if (errorMessage.childNodes[0] === undefined) {
    const errorText = document.createElement('div');
    errorText.classList.add('error-msg-text');
    errorText.innerHTML = 'please enter a task!';
    errorMessage.appendChild(errorText);
    setTimeout(() => errorMessage.removeChild(errorText), 3000);
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
