// Get tasks from local storage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('click', () => toggleCompletion(index));
        li.appendChild(checkbox);

        const span = document.createElement('span');
        span.textContent = `${task.name} (Date: ${task.date}, Priority: ${task.priority})`;
        if (task.completed) {
            span.classList.add('completed');
        }
        li.appendChild(span);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => completeTask(index));
        li.appendChild(completeButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTask(index));
        li.appendChild(removeButton);

        taskList.appendChild(li);
    });
}

// Add new task
function addTask() {
    const taskNameInput = document.getElementById('taskName');
    const taskDateInput = document.getElementById('taskDate');
    const taskPriorityInput = document.getElementById('taskPriority');

    const taskName = taskNameInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskPriority = taskPriorityInput.value;

    if (taskName !== '') {
        tasks.push({ name: taskName, date: taskDate, priority: taskPriority, completed: false });
        taskNameInput.value = '';
        taskDateInput.value = '';
        taskPriorityInput.value = 'low';
        saveTasks();
        displayTasks();
    }
}

// Toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Mark task as complete
function completeTask(index) {
    tasks[index].completed = true;
    saveTasks();
    displayTasks();
    alert('Task completed!');
}

// Remove task
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Remove completed tasks
function removeCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
}
// Rest of your JavaScript code

// Popup Message after Task Removal
function showRemovePopup() {
    const popup = document.getElementById('removePopupMessage');
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000); // Adjust the duration (in milliseconds) as needed
}

// Remove task
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
    showRemovePopup(); // Show popup message
}


// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial display of tasks
displayTasks();
