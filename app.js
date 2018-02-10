let task = document.querySelector("#tasker");
let tasksearch = document.querySelector("#taskersearch"); 

document.querySelector("#submitform").addEventListener("submit", submitForm);
document.querySelector("#taskersearch").addEventListener("keyup", searchTasks);
document.querySelector("#taskerList").addEventListener("click", deleteTasks);
populateDom();


function submitForm(e){

    let val = task.value;
    if(val.length != 0){

        saveTask(val);

        let html = document.createElement("li");
        html.classList.add("collection-item");
        html.innerHTML = `<div><span id="taskvall">${val}</span><a href="javascript:void(0)" class="secondary-content"><i class="material-icons removetask">delete</i></a></div>`;
        document.querySelector("#taskerList").appendChild(html);

    }
    e.preventDefault();
}

function deleteTasks(e){

    if(e.target.classList.contains("removetask")){
        
            e.target.parentElement.parentElement.parentElement.remove();
            deleteTaskInDb(e.target.parentElement.parentElement.firstChild.textContent);
            let toastContent = $(`<span>${e.target.parentElement.parentElement.firstChild.textContent} ~ has been removed</span>`).add($('<button class="btn-flat toast-action" id="undoaction">Undo</button>'));
            Materialize.toast(toastContent, 10000);
            document.querySelector("#undoaction").addEventListener("click", undoDeleteTasks);

            //console.log();

        
    }
    e.preventDefault();
}
function undoDeleteTasks(e){

    let task = document.querySelector("#undoaction").parentElement.querySelector("span").textContent;
    let val = task.split("~")[0];
    let html = document.createElement("li");
        html.classList.add("collection-item");
        html.innerHTML = `<div><span id="taskvall">${val}</span><a href="javascript:void(0)" class="secondary-content"><i class="material-icons removetask">delete</i></a></div>`;
        document.querySelector("#taskerList").appendChild(html);
        document.querySelector("#undoaction").parentElement.remove();
    
        saveTask(val);
    e.preventDefault();
}

function searchTasks(e){

    let search = tasksearch.value;
    let eachVal = document.querySelectorAll(".collection-item");

    if(eachVal.length != 0){

        eachVal.forEach((v)=>{

            if(v.firstChild.textContent.search(search) != -1){

                v.style.display =  'block';

            }else{

                v.style.display =  'none';

            }
        });

    }else{
        document.querySelectorAll(".collection-item").forEach(()=>{
            v.style.display =  'block';
        });

    }
    e.preventDefault();
}

function saveTask(val){

    let task = val;
    let tasks;

    if(localStorage.getItem("tasks") == null){

        tasks = [];

    }else{
        //tasks = [];
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function populateDom(){
    
    if(localStorage.getItem("tasks") != null){

        let tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach((val)=>{

            var html = document.createElement("li");
            html.classList.add("collection-item");
            html.innerHTML = `<div><span id="taskvall">${val}</span><a href="javascript:void(0)" class="secondary-content"><i class="material-icons removetask">delete</i></a></div>`;
            document.querySelector("#taskerList").appendChild(html);

        });

    }

}

function deleteTaskInDb(val){

    if(localStorage.getItem("tasks") != null){

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        
        if(tasks.indexOf(val) != -1){

            tasks.splice(tasks.indexOf(val), 1);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }

}

