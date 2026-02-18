// Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to display todos
function displayTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${todo} <button onclick="deleteTodo(${index})">মুছুন</button>
        `;
        todoList.appendChild(li);
    });
}

// Add new todo
addBtn.addEventListener('click', () => {
    const todoText = input.value.trim();
    if(todoText) {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        input.value = '';
        displayTodos();
    } else {
        alert('প্রথমে একটি কাজ লিখুন!');
    }
});

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

// Initial display
displayTodos();
