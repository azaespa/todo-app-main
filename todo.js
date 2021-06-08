const todoInputForm = document.querySelector(".todo-input-form"),
  todoInputText = todoInputForm.querySelector(".todo-input-text");

const todoList = document.querySelector(".todo-list");

const CN_TODO_DETAIL = "todo-detail";
const CN_TODO_RADIO = "todo-radio";
const CN_TODO = "todo";

function addTextToTodoList(INPUT_TEXT_VALUE) {
  const todoDetail = document.createElement("span");
  const todoRadio = document.createElement("input");
  const todo = document.createElement("li");

  todoRadio.setAttribute("type", "radio");

  todoDetail.classList.add(CN_TODO_DETAIL);
  todoRadio.classList.add(CN_TODO_RADIO);
  todo.classList.add(CN_TODO);

  todoDetail.innerText = INPUT_TEXT_VALUE;
  todo.append(todoRadio);
  todo.append(todoDetail);
  todoList.append(todo);
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
    clearTodoInputText();
  } else {
   clearTodoInputText();
  }
}

function init() {
  todoInputForm.addEventListener("submit", handleSubmitTodo);
}

init();
