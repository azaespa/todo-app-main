const todoInputForm = document.querySelector(".todo-input-form"),
 todoInputText = todoInputForm.querySelector(".todo-input-text");

const todoList = document.querySelector(".todo-list");

const CN_TODO_DETAIL = "todo-detail";
const CN_TODO_RADIO = "todo-radio";
const CN_TODO = "todo";

function addTextToTodoList(INPUT_TEXT_VALUE){
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

function handleSubmitTodo(event){
 event.preventDefault();
 const INPUT_TEXT_VALUE = todoInputText.value;
 addTextToTodoList(INPUT_TEXT_VALUE);
 todoInputText.value = "";
}

function init(){
 todoInputForm.addEventListener("submit", handleSubmitTodo);
}

init();