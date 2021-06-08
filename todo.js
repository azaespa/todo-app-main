const todoInputForm = document.querySelector(".todo-input-form"),
  todoInputText = todoInputForm.querySelector(".todo-input-text");

const todoList = document.querySelector(".todo-list"),
 todoInputRadioList = todoList.querySelectorAll(".todo-radio");

const todoNav = document.querySelector(".todo-nav"),
 todoItemsLeft = todoNav.querySelector(".todo-items-left");

const CN_TODO_DETAIL = "todo-detail";
const CN_TODO_RADIO = "todo-radio";
const CN_TODO = "todo";
const CN_ACTIVE = "active";

let todoItemsCount = 0;

function uncheckTodoInputRadio(event){
 const THIS_RADIO = event.target;
 THIS_RADIO.checked = false;
 increaseTodoItemsCount();
}

function loadTodoItemsCount(){
 todoItemsLeft.innerText = `${todoItemsCount} items left`;
}

function decreaseTodoItemsCount(){
 todoItemsCount--;
 loadTodoItemsCount();
}

function increaseTodoItemsCount() {
 todoItemsCount++;
 loadTodoItemsCount();
}

function handleClickThisRadio(event) {
 const THIS_RADIO = event.target;
 THIS_RADIO.checked = false;
 THIS_RADIO.removeEventListener("click", handleClickThisRadio);
 increaseTodoItemsCount();
}

function handleChangeTodoRadio(event) {
 const THIS_RADIO = event.target;
 const TODO = THIS_RADIO.closest(".todo");
 THIS_RADIO.addEventListener("click", handleClickThisRadio);
 decreaseTodoItemsCount();
 console.log(TODO)
}

function addTextToTodoList(INPUT_TEXT_VALUE) {
  const todoDetail = document.createElement("span");
  const todoRadio = document.createElement("input");
  const todoId = new Date().getTime();
  const todo = document.createElement("li");

  todoRadio.setAttribute("type", "radio");

  todoDetail.classList.add(CN_TODO_DETAIL);
  todoRadio.classList.add(CN_TODO_RADIO);
  todo.classList.add(CN_TODO, CN_ACTIVE);
  todo.id = todoId;

  todoDetail.innerText = INPUT_TEXT_VALUE;
  todo.append(todoRadio);
  todo.append(todoDetail);
  todoList.append(todo);

  todoRadio.addEventListener("change", handleChangeTodoRadio);

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
}

init();
