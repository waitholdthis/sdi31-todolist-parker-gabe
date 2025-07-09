// console.log('My code is running');
// console.log(document.querySelector('#todo-form'));
var form = document.getElementById("todo-form");
function handleForm(event){event.preventDefault();}
form.addEventListener('submit', handleForm);


function radioAdd() {
  // 1. Get the form and the element you want to insert before
    const form = document.getElementById('todo-form');
    const referenceElement = document.querySelector('.user-card');

    // 2. Create the new elements
    const newRadio = document.createElement('input');
    newRadio.type = 'radio';
    newRadio.name = 'example'; // Keep the same name to group them

    const newLabel = document.createTextNode(' example '); // Create the text label

    const newRemoveButton = document.createElement('button');
    newRemoveButton.type = 'button'; // Use type="button" to avoid form submission
    newRemoveButton.textContent = 'Remove';

    const lineBreak = document.createElement('br');
    const doubleLineBreak = document.createElement('br');


    // 3. Insert the new elements into the form before the reference element
    form.insertBefore(newRadio, referenceElement);
    form.insertBefore(newLabel, referenceElement);
    form.insertBefore(newRemoveButton, referenceElement);
    form.insertBefore(lineBreak, referenceElement);
    form.insertBefore(doubleLineBreak, referenceElement);
}