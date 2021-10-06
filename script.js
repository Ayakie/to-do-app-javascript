"use strict";

let toDo = fetchSavedTodos("toDo");

// Setup filters
let filters = {
  searchText: "",
  hideCompleted: null,
};

// 初期表示
renderTodo(toDo, filters);

// Listen for new todo creation
document.getElementById("form-add").addEventListener("submit", (e) => {
  e.preventDefault();
  // toDo データの中身
  toDo.push({
    text: e.target.elements.newToDo.value,
    completed: false,
    id: uuidv4(),
  });

  storeTodo(toDo, "toDo");

  renderTodo(toDo, filters);

  e.target.elements.newToDo.value = "";
});

// Listen for filter
document.getElementById("filter-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodo(toDo, filters);
});

// Listen for hide checkbox
document.getElementById("check-completed").addEventListener("change", (e) => {
  // console.log(e.target.checked)
  filters.hideCompleted = e.target.checked;
  renderTodo(toDo, filters);
});

document.getElementById('delete-all').addEventListener("click", () => {
  if(window.confirm('タスクを全て削除しますか？')) {
    toDo = [];
    storeTodo(toDo);
    renderTodo(toDo, filters)
  }
})