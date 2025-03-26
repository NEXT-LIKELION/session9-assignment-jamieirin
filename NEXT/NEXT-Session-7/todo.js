const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('tasklist'); 

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskObj = { text: taskText, completed: false };
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const li = createTaskElement(taskObj, tasks.length - 1);
    taskList.appendChild(li);
    taskInput.value = '';
}

function createTaskElement(taskObj, index) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = taskObj.completed;
    checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskTextSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskObj.text;
    taskTextSpan.style.margin = '0 10px';
    if (taskObj.completed) {
        taskTextSpan.style.textDecoration = 'line-through';
    }

    const editBtn = document.createElement('button');
    editBtn.textContent = '수정';
    editBtn.addEventListener('click', () => {
        const newText = prompt('수정할 내용을 입력하세요:', taskObj.text);
        if (newText !== null && newText.trim() !== '') {
            taskObj.text = newText.trim();
            taskTextSpan.textContent = taskObj.text;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
        const confirmDelete = confirm('정말 삭제하시겠습니까?');
        if (confirmDelete) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); 
        }
    });

    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = createTaskElement(task, index);
        taskList.appendChild(li);
    });
}

renderTasks();
