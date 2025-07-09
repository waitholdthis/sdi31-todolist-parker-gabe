// console.log('My code is running');
// console.log(document.querySelector('#todo-form'));
var pageForm = document.getElementById("todo-form");
function handleForm(event){event.preventDefault();}
pageForm.addEventListener('submit', handleForm);


const addButton = document.getElementById('Add');
const taskInput = document.getElementById('todo-input');
const form = document.getElementById('end');

// // Listen for a click on the 'Add' button
// addButton.addEventListener('click', () => {
// // 1. Get the text from the input box and remove extra whitespace
// const userInput = taskInput.value.trim();

// // 2. Don't add an empty task. If the input is empty, do nothing.
// if (userInput === '') {
//     alert('Please enter a task.');
//     return;
// }

// // 3. Find the element we want to insert the new task before
// const referenceElement = document.querySelector('end');

// // 4. Create the new elements for the task
// const newCheckbox = document.createElement('input');
// newCheckbox.type = 'checkbox';
// newCheckbox.id = 'checkbox';


// const newLabel = document.createTextNode(` ${userInput} `); // Use the text from the input


// const lineBreak1 = document.createElement('br');
// const lineBreak2 = document.createElement('br');

// // 5. Add the new elements to the form
// form.insertBefore(newCheckbox, referenceElement);
// form.insertBefore(newLabel, referenceElement);
// form.insertBefore(lineBreak1, referenceElement);
// form.insertBefore(lineBreak2, referenceElement);


// // 6. Clear the input box for the next task
// taskInput.value = '';
// });



// This is the updated "Add" button listener
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // --- Key Changes Here ---
    
    // 1. Create a wrapper div for the entire task
    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'task-item';

    // 2. Create the checkbox
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';

    // 3. Create the text label using a <span> so it can be styled
    const newLabel = document.createElement('span');
    newLabel.textContent = ` ${taskText} `;

    // 4. Append the checkbox and label to the wrapper div
    taskWrapper.appendChild(newCheckbox);
    taskWrapper.appendChild(newLabel);

    // 5. Add the new task wrapper to the form
    const form = document.getElementById('todo-form');
    const referenceElement = document.getElementById('end');
    form.insertBefore(taskWrapper, referenceElement);

    // 6. Clear the input box
    taskInput.value = '';
});

// Add this new code to index.js
const todoForm = document.getElementById('todo-form');

todoForm.addEventListener('click', (event) => {
    // Check if the element that was clicked is a checkbox
    if (event.target.type === 'checkbox') {
        // Find the parent .task-item container of the checkbox
        const taskItem = event.target.parentElement;
        
        // Add or remove the 'completed' class
        taskItem.classList.toggle('completed');
    }
});