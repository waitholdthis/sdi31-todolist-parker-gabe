document.addEventListener('DOMContentLoaded', () => {

    let todoForm = document.getElementById('todo-form');
    let addButton = document.getElementById('Add');
    let taskInput = document.getElementById('todo-input');
    let beforeEnd = document.getElementById('end');
    let clearAllButton = document.getElementById('clearAllBtn');
    let completedForm = document.getElementById('completed-form');

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

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

        taskWrapper.appendChild(newCheckbox);
        taskWrapper.appendChild(newLabel);

        todoForm.insertBefore(taskWrapper, beforeEnd);
    };

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

    todoForm.addEventListener('click', (event) => {
    let clickedElement = event.target;
    let taskItem = clickedElement.closest('.task-item');
    if (!taskItem) return;

    if (clickedElement.type === 'checkbox') {
        taskItem.classList.toggle('completed');

        
        // Fireworks logic
        let completedCount = document.querySelectorAll('.task-item.completed').length;
        if (completedCount === 5) {
            // This is the fireworks code
            const duration = 3 * 1000; // 3 seconds
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }
    
    saveTasks();
});
    
    let clearAllTasks = () => {
        let taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(item => item.remove());
        
        localStorage.removeItem('todos');
    };

    clearAllButton.addEventListener('click', clearAllTasks);
    
    let loadTasks = () => {
        let savedTasks = JSON.parse(localStorage.getItem('todos')) || [];
        savedTasks.forEach(task => renderTask(task));
    };

    loadTasks();
});