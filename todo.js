const todoInputForm = document.querySelector(".todo-input-form"),
  todoInputText = todoInputForm.querySelector(".todo-input-text");

const todoList = document.querySelector(".todo-list");

const todoNav = document.querySelector(".todo-nav"),
 todoItemsCounter = todoNav.querySelector(".todo-items-counter"),
 todoSortButtons = todoNav.querySelectorAll(".todo-sort-btn"),
 clearCompletedTodoBtn = todoNav.querySelector(".todo-clear-btn");

const CN_TODO_DETAIL = "todo-detail";
const CN_TODO_RADIO = "todo-radio";
const CN_TODO = "todo";
const CN_DROPZONE = "dropzone";
const CN_ACTIVE_TODO = "active-todo";
const CN_COMPLETED_TODO = "completed-todo";

let todoItemsCount = 0;
let lastTodoSortBtnSelected = "all-list";
let draggedTodoDiv, draggedTodo;
let targetTodoDiv, targetTodo;

function handleClearCompleted() {
  const COMPLETED_TODOS = todoList.querySelectorAll(".completed-todo");
  COMPLETED_TODOS.forEach(todo => {
    todoList.removeChild(todo.parentNode);
  });
}

function sortTodoList(SORT_BTN_ID){
 const TODO_LIST = todoList.querySelectorAll(".todo");
 TODO_LIST.forEach(todo => {
   const TODO_DIV = todo.querySelector("div");
  switch(SORT_BTN_ID){
   case "completed-list":
    if(TODO_DIV.classList.contains(CN_COMPLETED_TODO)){
     todo.style.display = "block";
    } else {
     todo.style.display = "none";
    }
    break;
   case "active-list":
    if(TODO_DIV.classList.contains(CN_ACTIVE_TODO)){
     todo.style.display = "block";
    } else {
     todo.style.display = "none";
    }
    break;
   default: 
    todo.style.display = "block";
    break;
  }
 })
}

function styleSortBtn(THIS_SORT_BTN){
 const LAST_SORT_BTN_SELECTED = document.getElementById(lastTodoSortBtnSelected);
 if(!THIS_SORT_BTN.classList.contains("selected")){
  LAST_SORT_BTN_SELECTED.classList.remove("selected");
  THIS_SORT_BTN.classList.add("selected");
  lastTodoSortBtnSelected = THIS_SORT_BTN.id;
 }
}

function handleSortBtn(event){
 const THIS_SORT_BTN = event.target;
 sortTodoList(THIS_SORT_BTN.id);
 styleSortBtn(THIS_SORT_BTN);
}

function sortTodoButtonsAddEventListener() {
  todoSortButtons.forEach(todoSortButton => {
    todoSortButton.addEventListener("click", handleSortBtn);
  });
}

function uncheckTodoInputRadio(event){
 const THIS_RADIO = event.target;
 THIS_RADIO.checked = false;
 increaseTodoItemsCount();
}

function loadTodoItemsCount(){
 todoItemsCounter.innerText = `${todoItemsCount} items left`;
}

function decreaseTodoItemsCount(){
 todoItemsCount--;
 loadTodoItemsCount();
}

function increaseTodoItemsCount() {
 todoItemsCount++;
 loadTodoItemsCount();
}

function uncheckThisRadio(event) {
 const THIS_RADIO = event.target;
 const THIS_TODO_DIV = THIS_RADIO.closest("div");
 THIS_RADIO.checked = false;
 THIS_RADIO.removeEventListener("click", uncheckThisRadio);
 if(THIS_TODO_DIV.classList.contains(CN_COMPLETED_TODO)){
  THIS_TODO_DIV.classList.remove(CN_COMPLETED_TODO);
  THIS_TODO_DIV.classList.add(CN_ACTIVE_TODO);
 }
 increaseTodoItemsCount();
 
}

function handleClickDeleteTodo(event) {
  const DELETE_BUTTON = event.target;
  const TODO = DELETE_BUTTON.closest(".todo");
  todoList.removeChild(TODO);
  decreaseTodoItemsCount();
}

function handleChangeTodoRadio(event) {
 const THIS_RADIO = event.target;
 const THIS_TODO_DIV = THIS_RADIO.closest("div");
 THIS_RADIO.addEventListener("click", uncheckThisRadio);

 if(THIS_TODO_DIV.classList.contains(CN_ACTIVE_TODO)){
  THIS_TODO_DIV.classList.remove(CN_ACTIVE_TODO);
  THIS_TODO_DIV.classList.add(CN_COMPLETED_TODO);
 }
 decreaseTodoItemsCount();
 
}

function addTextToTodoList(INPUT_TEXT_VALUE) {
  const todoDelete = document.createElement("button");
  const todoDetail = document.createElement("span");
  const todoRadio = document.createElement("input");
  const todoId = new Date().getTime();
  const todo = document.createElement("div");
  const todoContainer = document.createElement("li")

  todoRadio.setAttribute("type", "radio");

  todoDetail.classList.add(CN_TODO_DETAIL);
  todoRadio.classList.add(CN_TODO_RADIO);
  todo.classList.add(CN_ACTIVE_TODO);
  todoContainer.classList.add(CN_TODO,CN_DROPZONE);
  todoContainer.id = todoId;

  todoDelete.innerHTML = "<img src=images/icon-cross.svg>"
  todoDetail.innerText = INPUT_TEXT_VALUE;
  todo.append(todoRadio);
  todo.append(todoDetail);
  todo.append(todoDelete);
  todo.draggable = true;
  todoContainer.append(todo);
  todoList.append(todoContainer);

  todoRadio.addEventListener("change", handleChangeTodoRadio);
  todoDelete.addEventListener("click", handleClickDeleteTodo);
  todo.addEventListener("dragstart", (event) => {
    draggedTodoDiv = event.target;
    draggedTodo = draggedTodoDiv.parentNode;
    console.log(draggedTodo)
  });
  todo.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  todo.addEventListener("dragenter", (event) => {
    
  });
  todo.addEventListener("drop", (event) => {
    event.preventDefault();
    const CLOSEST_DIV_FROM_TARGET = event.target.closest("div");
    const PARENT_OF_CLOSEST_DIV = CLOSEST_DIV_FROM_TARGET.parentNode;
    targetTodoDiv = CLOSEST_DIV_FROM_TARGET;
    draggedTodo.append(targetTodoDiv);
    PARENT_OF_CLOSEST_DIV.append(draggedTodoDiv);
    console.log(PARENT_OF_CLOSEST_DIV)
  })
  //debug sort error
  
  // drag div -> drop div#id on dropzone -> get target's closest  div#id -> append dragged div to target -> append stored div to dragged previous container
}

function clearTodoInputText() {
 todoInputText.value = "";
}

function handleSubmitTodo(event) {
  event.preventDefault();

  const TODO_INPUT_IS_NOT_EMPTY = (todoInputText.value !== "");
  const UNWANTED_SPACES = /^\s+/;
  const NO_SPACES_AT_THE_BEGINNING = (todoInputText.value.match(UNWANTED_SPACES) === null);
  
  if (TODO_INPUT_IS_NOT_EMPTY && NO_SPACES_AT_THE_BEGINNING) {
    const INPUT_TEXT_VALUE = todoInputText.value;
    addTextToTodoList(INPUT_TEXT_VALUE);
    increaseTodoItemsCount();
    clearTodoInputText();
  } else {
   clearTodoInputText();
  }
}

function init() {
  todoInputForm.addEventListener("submit", handleSubmitTodo);
  loadTodoItemsCount();
  sortTodoButtonsAddEventListener();
  clearCompletedTodoBtn.addEventListener("click", handleClearCompleted);
}

init();
