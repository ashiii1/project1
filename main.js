// Select elements
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

// Retrieve existing todos from localStorage
let allTodos = getTodos();

// Update the todo list on page load
updateTodoList();

// Add event listener for form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    saveTodos();
});

// Function to add a new todo
function addTodo() {
    const todoText = todoInput.value.trim(); // Trim to avoid empty spaces
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false,
            date: new Date().toLocaleString() // Add date property
        };
        allTodos.push(todoObject);
        saveTodos();
        updateTodoList();
        todoInput.value = ""; // Clear input field
    }
}

// Function to update the todo list
function updateTodoList() {
    todoListUL.innerHTML = ""; // Clear the list
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

// Function to create a todo list item
function createTodoItem(todo, todoIndex) {
    const todoID = 'todo-' + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";

    // Add the todo item structure
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label class="custom-checkbox" for="${todoID}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoID}" class="todo-text">
            <input id="text" class="todo-text" type="text" value="${todo.text}" readonly>
        </label>
        <span class="todo-date">Created: ${todo.date}</span>
        <button class="edit">EDIT</button>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>`;

    // Access individual elements
    const inputText = todoLI.querySelector("#text");
    const deleteButton = todoLI.querySelector(".delete-button");
    const checkbox = todoLI.querySelector("input[type='checkbox']");
    const editButton = todoLI.querySelector(".edit");

    // Set checkbox state
    checkbox.checked = todo.completed;

    // Add event listeners

    // Handle delete button
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
        saveTodos();
        updateTodoList();
    });

    // Handle checkbox state change
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });

    // Handle edit button
    editButton.addEventListener('click', () => {
        if (editButton.innerText === "EDIT") {
            inputText.removeAttribute("readonly");
            editButton.innerText = "SAVE";
        } else {
            allTodos[todoIndex].text = inputText.value.trim();
            saveTodos();
            inputText.setAttribute("readonly", "readonly");
            editButton.innerText = "EDIT";
        }
    });

    return todoLI;
}

// Function to delete a todo item
function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
}

// Function to save todos to localStorage
function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

// Function to get todos from localStorage
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
// Add a reference to the search input element
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Add an event listener to the search input
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    filterTodos(query);
});

// Function to filter and display todos based on the search query
function filterTodos(query) {
    searchResults.innerHTML = ""; // Clear previous search results
    if (query.length === 0) return; // Do nothing if the query is empty

    const filteredTodos = allTodos.filter(todo => todo.text.toLowerCase().includes(query));
    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.textContent = `${todo.text} (Created: ${todo.date})`;
            searchResults.appendChild(resultItem);
        });
    } else {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = "No matches found.";
        searchResults.appendChild(noResults);
    }
}



// Get the theme toggle button
const themeToggleButton = document.getElementById('theme-toggle');

// Add event listener for theme toggle
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
