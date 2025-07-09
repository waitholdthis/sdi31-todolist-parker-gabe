document.addEventListener('DOMContentLoaded', () => {

    // --- Get main elements from the HTML ---
    let todoForm = document.getElementById('todo-form');
    let addButton = document.getElementById('Add');
    let taskInput = document.getElementById('todo-input');
    let referenceElement = document.getElementById('end');
    let clearAllButton = document.getElementById('clearAllBtn'); // Get the new button

    // --- Prevent the form from reloading the page ---
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    // --- SAVE tasks to Local Storage ---
    let saveTasks = () => {
        let tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent.trim(),
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(tasks));
    };

    // --- RENDER a single task on the page ---
    let renderTask = (task) => {
        let taskWrapper = document.createElement('div');
        taskWrapper.className = 'task-item';
        if (task.completed) {
            taskWrapper.classList.add('completed');
        }

        let newCheckbox = document.createElement('input');
        newCheckbox.type = 'checkbox';
        newCheckbox.checked = task.completed;

        let newLabel = document.createElement('span');
        newLabel.textContent = ` ${task.text} `;
        
        // Create the per-task remove button
        let newRemoveButton = document.createElement('button');
        newRemoveButton.type = 'button';
        newRemoveButton.className = 'remove-btn';
        newRemoveButton.textContent = 'Remove';

        taskWrapper.appendChild(newCheckbox);
        taskWrapper.appendChild(newLabel);
        taskWrapper.appendChild(newRemoveButton); // Add the button to the task

        todoForm.insertBefore(taskWrapper, referenceElement);
    };

    // --- Listen for clicks to ADD a new task ---
    addButton.addEventListener('click', () => {
        let taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        renderTask({ text: taskText, completed: false });
        saveTasks();
        taskInput.value = '';
    });

    // --- Listen for clicks to COMPLETE or REMOVE individual tasks ---
    todoForm.addEventListener('click', (event) => {
        let clickedElement = event.target;
        let taskItem = clickedElement.closest('.task-item');
        if (!taskItem) return;

        if (clickedElement.classList.contains('remove-btn')) {
            taskItem.remove(); // Removes the single task from the pageS
        } else if (clickedElement.type === 'checkbox') {
            taskItem.classList.toggle('completed');
            
            // Fireworks logic
            let completedCount = document.querySelectorAll('.task-item.completed').length;
            if (completedCount === 5) {
                // ... (fireworks code remains the same)
            }
        }
        
        saveTasks(); // Save after any change
    });
    
    // --- New Function to CLEAR ALL tasks ---
    let clearAllTasks = () => {
        // Remove all task items from the page
        let taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(item => item.remove());
        
        // Clear Local Storage
        localStorage.removeItem('todos');
    };

    // --- Listen for clicks on the new CLEAR ALL button ---
    clearAllButton.addEventListener('click', clearAllTasks);
    
    // --- LOAD tasks from Local Storage when the page opens ---
    let loadTasks = () => {
        let savedTasks = JSON.parse(localStorage.getItem('todos')) || [];
        savedTasks.forEach(task => renderTask(task));
    };

    // Initial load of tasks
    loadTasks();
});