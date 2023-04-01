(()=>{
    let tasks = [];
    const taskList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    function addTasksToDOM(task) {
        const li  = document.createElement('li');
        li.innerHTML = `
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}
                class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
                <img src="trash-can-solid.svg" class="delete" data-id="${task.id}" />
        `;
        taskList.append(li);
    }

    // function fetchList(){
    //     // get the list of tasks from json api
    //     fetch('https://jsonplaceholder.typicode.com/todos')
    //         .then(function(response){ 
    //             return response.json();
    //         })
    //         .then(function(data){
    //             tasks = data.slice(0, 10);
    //             renderList();
    //         })
    //         .catch(function(err){
    //             console.log('error', err.message);
    //         });
    // }

    async function fetchList(){
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.slice(0, 10);
            renderList();
        } catch (error) {
            console.log('error', error)
        }

    }

    function renderList () {
        taskList.innerHTML = '';
        for (let index = 0; index < tasks.length; index++) {
            addTasksToDOM(tasks[index]);
        }
        tasksCounter.innerText = tasks.length;
    }

    function taskToggled (taskId) {
        const task = tasks.filter(task => task.id == taskId);
        if(task.length > 0) {
            const currTask = task[0];
            currTask.completed = !currTask.completed;
            renderList();
            showNotification('Task Toggled (:');
            return;
        }
        showNotification("Task couldn't Toggled ):");
    }

    function deleteTask (taskId) {
        const newTasks = tasks.filter(task => task.id != taskId);
        tasks = newTasks;
        renderList();
        showNotification('Task deleted!');
    }

    function addTask (task) {
        if(task){
            // fetch('https://jsonplaceholder.typicode.com/todos',{
            //     method: 'POST',
            //     headers: { 
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(task)
            // })
            // .then(function(response){ 
            //     return response.json();
            // })
            // .then(function(data){
            //     tasks.push(task);
            //     renderList();
            //     showNotification('Task added successfully (:');
            // // return;
            // })
            // .catch(function(err){
            //     console.log('error', err.message);
            // });

            tasks.push(task);
            renderList();
            showNotification('Task added successfully (:');
            return;
        }
        showNotification('Task can not added!');
    }
    function showNotification(text) {
        window.alert(text);
    }

    function handleInputKeyPress(event){
        if(event.key == 'Enter'){
            const text = event.target.value;
            // console.log('text', text);
    
        if(!text){
            showNotification('Please enter a text! Cannot be empty.');
            return;
        }
        const task = {
            title: text,
            id : Date.now().toString(),
            completed: false
        }
        event.target.value = '';
        addTask(task);
    }
    }

    function handleClicks(event) {
        const target = event.target;
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if(target.className === 'custom-checkbox'){
            const taskId = target.id;
            taskToggled(taskId);
            return;
        }
    }



    (function intitializeList(){
        fetchList();
        addTaskInput.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleClicks);
    })();
})();