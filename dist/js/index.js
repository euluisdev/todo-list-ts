"use strict";
const inputTask = document.querySelector('#inputTask');
const btnTask = document.querySelector('#btnTask');
const ulTask = document.querySelector('#ulTask');
// it handles null values
if (!inputTask || !btnTask || !ulTask) {
    throw new Error('Um ou mais elementos não foram encontrados no DOM!');
}
;
//empty array declared to receive input values
let myListItens = [];
// get data stored in localstorage
const localStorageItem = localStorage.getItem('list');
if (localStorageItem) {
    myListItens = JSON.parse(localStorageItem);
}
;
//get value input and add new task 
const addNewTask = () => {
    myListItens.push({
        task: inputTask.value,
        completed: false
    });
    updateTaskList(); //call function
};
//show the task in the list
const showTask = () => {
    ulTask.textContent = '';
    myListItens.forEach((item, index) => {
        const newLi = document.createElement('li');
        newLi.classList.add('li-task');
        /* create img button checked */
        const imgChecked = document.createElement('img');
        imgChecked.src = '/dist/img/checked.png';
        if (imgChecked) {
            imgChecked.addEventListener('click', () => toggleTask(index));
        }
        ;
        /* create paragraph */
        const paragraph = document.createElement('p');
        paragraph.textContent = item.task;
        /* add||remove class 'done' in the li */
        if (item.completed) {
            newLi.classList.add('done');
        }
        ;
        /* create img trash */
        const imgTrash = document.createElement('img');
        imgTrash.src = '/dist/img/trash.png';
        if (imgTrash) {
            imgTrash.addEventListener('click', () => removeTrash(index));
        }
        newLi.appendChild(imgChecked); //it attach a imgChecked to 'li'
        newLi.appendChild(paragraph); //it attach a paragraph to 'li'
        newLi.appendChild(imgTrash); //it attach a imgTrash to 'li'
        ulTask.appendChild(newLi); //it attach the 'li' to 'ul'
    });
};
// Toggle=alterna task completion
const toggleTask = (index) => {
    myListItens[index].completed = !myListItens[index].completed;
    updateTaskList();
};
// remove a task
const removeTrash = (index) => {
    myListItens.splice(index, 1);
    updateTaskList();
};
// Update the task list and save to localStorage
const updateTaskList = () => {
    showTask();
    saveToLocalStorage(); //call function save local storage
};
//object will be converted to string in .JSON and save the list to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(myListItens));
};
//to do
const btnClick = () => {
    const toDo = inputTask.value;
    if (toDo !== '' && toDo !== ' ') {
        addNewTask();
        inputTask.value = ''; //clear input after click
        inputTask.focus(); //Set focus on input
    }
    else {
        alert('Adicione uma tarefa!');
    }
    ;
};
/* when refreshing the page, it shows local storage data */
showTask();
//click buttonand call function addNewTask
if (btnTask) {
    btnTask.addEventListener("click", btnClick);
}
;
