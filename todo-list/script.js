
// create a new array to hold the todo list
let todos;
// takes a string to a Array
let savedTodos = JSON.parse(localStorage.getItem('todos'));
// Checks if its an Array
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
    todos = [{
    title: 'Get Groceries', 
    dueDate: '2021-10-4',
    id: 'id1'
  }, {
    title: 'Wash Car',
    dueDate: '2021-8-4',
    id: 'id2'
  }, {
    title: 'Make Dinner',
    dueDate: '2021-9-8',
    id: 'id3'
  }];
}
// creates a todo object in an array 
function createTodo(title, dueDate) {
    
    let id = ' ' + new Date().getTime();
    todos.push({
      title: title,
      dueDate: dueDate,
      id: id
    });
  saveTodos()
}
// removes the object in the array with the delete button
function removeTodo(idToDelete) {
    todos = todos.filter( function (todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodos()
}
// saves the list once any changes have been done 
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
// calling the function to display the todo list
render();
// making a function to add a todo to the list with the text field puts information on the screen in a div 
function addTodo() {
    let textBox = document.getElementById('todo-title');
    let datePicker = document.getElementById('date-picker');
    let title = textBox.value;
    let dueDate = datePicker.value;
    
    createTodo(title, dueDate);
    render();
}
// mvc to delete the item within the array
function deleteTodo() {
    let deleteBtn = event.target;
    let idToDelete = deleteBtn.id;
  
  removeTodo(idToDelete)
  render()
}
// Visual with going through each item creating buttons 
// Controller with the onclicks
function render() {
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todos) {
        let element = document.createElement('div');
     
        element.innerText = todos.title + ' ' + todos.dueDate;
      
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = deleteTodo;
        deleteBtn.id = todos.id;
        element.appendChild(deleteBtn)
      
        let todoList = document.getElementById("todo-list");
        todoList.appendChild(element); 
    })
    
}