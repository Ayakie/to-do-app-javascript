// Check for existing saved data（JSON）and return todos object
const fetchSavedTodos = (key = "toDo") => {
  const todoJSON = localStorage.getItem(key);
  return todoJSON ? JSON.parse(todoJSON) : [];
};

const renderTodo = (todos, filters) => {
  // Show the number of incompleted todos object
  updateCompletedTodoDOM(todos);

  // initialization
  document.getElementById("to-do").innerHTML = "";

  // filter todo by text
  let filteredTodo = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  // display filtered to do list
  if (filters.hideCompleted) {
    filteredTodo = filteredTodo.filter((item) => !item.completed);
  }

  filteredTodo.forEach((todo) => {
    generateTodoDOM(todo);
  });

  // debugger
};

// Set local storage
// @param: toDo object
const storeTodo = (todos, key = "toDo") => {
  todoJSON = JSON.stringify(todos);
  localStorage.setItem(key, todoJSON);
};

// Output number of incompleted todos
const updateCompletedTodoDOM = (todos) => {
  const completedTodos = todos.filter((item) => item.completed);
  const numberCompleted = completedTodos.length;

  document.getElementById("number-finish").textContent = numberCompleted;
  document.getElementById("number-to-do").textContent = ' / ' + todos.length;
};

// generate and append element
const generateTodoDOM = (todo) => {
  // const innerEl = `
  //   <input class="form-check-input me-1" type="checkbox" value="">
  //   ${todo.text}
  //   <a href="#" class="fas fa-trash" id="${todo.id}-trash"></a>
  // `;
  const labelEl = document.createElement('label')
  labelEl.className = "list-group-item ps-5"

  const checkButton = document.createElement("input")
  checkButton.className = "form-check-input me-1 complete-check me-3"
  checkButton.type = "checkbox"
  checkButton.checked = todo.completed

  let innerText = `${todo.text}`
  
  const trashButton = document.createElement("a")
  trashButton.className = "fas fa-trash"
  trashButton.href = "#"
  
  
  // Listen to checkbox to check and update the stored data
  checkButton.addEventListener('change', (e) => {
    todo.completed = e.target.checked; // これないとチェックが入らない
    storeTodo(toDo);
    renderTodo(toDo, filters)
  })

  labelEl.insertAdjacentElement('afterbegin', checkButton)
  labelEl.insertAdjacentHTML('beforeend', innerText)
  labelEl.insertAdjacentElement('beforeend', trashButton)
  // labelEl.innerHTML = innerEl
  
  document.getElementById("to-do").appendChild(labelEl)
  
  //idでaタグを絞りこまないと、divをクリックした時にトリガーされる
  trashButton.addEventListener('click', () => {
    removeTodo(todo.id)
    storeTodo(toDo)
    renderTodo(toDo, filters)
  })
};

// trashボタンがクリックされたらlocalDBのデータを削除する
const removeTodo = (id) => {
  const deleteIdx = toDo.findIndex((todo) => todo.id === id)

  // これないと一番最後の要素が消される可能性あり
  if (deleteIdx > -1) {
    toDo.splice(deleteIdx, 1)
  }
};