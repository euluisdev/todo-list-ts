const inputTask: HTMLInputElement | null = document.querySelector('#inputTask');
const btnTask: HTMLButtonElement | null = document.querySelector('#btnTask');
const ulTask: HTMLElement | null = document.querySelector('#ulTask');

// it handles null values
if ( !inputTask || !btnTask || !ulTask ) {
    throw new Error('Um ou mais elementos não foram encontrados no DOM!')
};

//empty array declared to receiveinput values
let myListItens: {
    task: string;   // item
    completed: boolean // index
}[] = [];


// get data stored in localstorage
const localStorageItem = localStorage.getItem('list');
if (localStorageItem) {
    myListItens = JSON.parse(localStorageItem);
};

//get value input and add new task 
const addNewTask = (): void => {
    myListItens.push({    //add input to the array
        task: inputTask.value,
        completed: false
    });  
    updateTaskList();  //call function
};

//show the task in the list
const showTask = (): void => {
    ulTask.textContent = '';

    myListItens.forEach((item, index): void => { // index is the position in the array
        const newLi: HTMLElement = document.createElement('li');
        newLi.classList.add('li-task');

        /* create img button checked */
        const imgChecked: HTMLImageElement = document.createElement('img');
        imgChecked.src = '/dist/img/checked.png';
        if (imgChecked) {
            imgChecked.addEventListener('click', (): void => toggleTask(index));
        };

        /* create paragraph */
        const paragraph: HTMLParagraphElement = document.createElement('p');
        paragraph.textContent = item.task;

        /* add||remove class 'done' in the li */
        if (item.completed) {
            newLi.classList.add('done');
        };

        /* create img trash */
        const imgTrash: HTMLImageElement = document.createElement('img');
        imgTrash.src = '/dist/img/trash.png';
        if (imgTrash) {
            imgTrash.addEventListener('click', (): void => removeTrash(index));
        }

        newLi.appendChild(imgChecked); //it attach a imgChecked to 'li'
        newLi.appendChild(paragraph); //it attach a paragraph to 'li'
        newLi.appendChild(imgTrash);  //it attach a imgTrash to 'li'

        ulTask.appendChild(newLi);  //it attach the 'li' to 'ul'
    });
};

// Toggle task completion
const toggleTask = (index: number): void => {
    myListItens[index].completed = !myListItens[index].completed;
    updateTaskList(); 
};

// remove a task
const removeTrash = (index: number): void => {
    myListItens.splice(index, 1); 
    updateTaskList();
};

// Update the task list andsave to localStorage
const updateTaskList = (): void => {
    showTask();
    saveToLocalStorage();  //call function save local storage
};

//object will be converted to string in .JSON and save the list to localStorage
const saveToLocalStorage = (): void => {
    localStorage.setItem('list', JSON.stringify(myListItens)); 
};

//to do
const btnClick = (): void => {
    const toDo: string | boolean = inputTask.value;
    if (toDo !== '' && toDo !== ' ') {
        addNewTask();

        inputTask.value = '';  //clear input after click
        inputTask.focus();     //Set focus on input
    } else {
        alert('Adicione uma tarefa!');
    };
};

/* when refreshing the page, it shows local storage data */
showTask();

//click buttonand call function addNewTask
if (btnTask) {
    btnTask.addEventListener("click", btnClick)
};