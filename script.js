// Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const sortNewest = document.getElementById('sort-newest');
const sortOldest = document.getElementById('sort-oldest');
const yearSpan = document.getElementById('year');

// Dynamic Footer Year
yearSpan.textContent = new Date().getFullYear();

// Load todos
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Display Todos
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

// Add Todo
function addTodo() {
    const todoText = input.value.trim();

    if (todoText) {
        todos.push({
            text: todoText,
            completed: false,
            createdAt: Date.now()
        });

        saveTodos();
        input.value = '';
    } else {
        alert('প্রথমে একটি কাজ লিখুন!');
    }
}

addBtn.addEventListener('click', addTodo);

// Enter key support
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Delete
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
}

// Edit
function editTodo(index) {
    const newText = prompt("নতুন টাস্ক লিখুন:", todos[index].text);
    if (newText) {
        todos[index].text = newText;
        saveTodos();
    }
}

// Toggle Complete
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
}

// Sort Newest
sortNewest.addEventListener('click', () => {
    todos.sort((a, b) => b.createdAt - a.createdAt);
    displayTodos();
});

// Sort Oldest
sortOldest.addEventListener('click', () => {
    todos.sort((a, b) => a.createdAt - b.createdAt);
    displayTodos();
});

// Save
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

// Date + Day + Time
function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const date = now.toLocaleDateString('bn-BD', options);
    const time = now.toLocaleTimeString('bn-BD');

    document.getElementById("datetime").innerHTML =
        date + " | " + time;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Initial Display
displayTodos();
