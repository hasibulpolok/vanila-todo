// Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const sortNewest = document.getElementById('sort-newest');
const sortOldest = document.getElementById('sort-oldest');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Display todos
function displayTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${todo.text}</span>
            <div>
                <button onclick="editTodo(${index})">✏️</button>
                <button onclick="deleteTodo(${index})">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Add new todo
addBtn.addEventListener('click', () => {
    const todoText = input.value.trim();
    if(todoText) {
        todos.push({ text: todoText, completed: false });
        saveTodos();
        input.value = '';
    } else {
        alert('প্রথমে একটি কাজ লিখুন!');
    }
});

// Delete todo
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
}

// Edit todo
function editTodo(index) {
    const newText = prompt("নতুন টাস্ক লিখুন:", todos[index].text);
    if(newText) {
        todos[index].text = newText;
        saveTodos();
    }
}

// Toggle complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
}

// Sort todos
sortNewest.addEventListener('click', () => {
    todos.reverse();
    displayTodos();
});

sortOldest.addEventListener('click', () => {
    todos.sort((a,b) => 0); // original order
    displayTodos();
});

// Save and display
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

// Initial display
displayTodos();
