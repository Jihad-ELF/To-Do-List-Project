//NB; sweet alert "swal" is a library for creating beautiful and customizable pop-up modals
//this is its format:
//swal("add title Text","Add simple text","add icon",{Json Format To add other swal function})
//-------------------------------------------------------------------------------------------------

//set up all variables
let theInput=document.querySelector(".add-task input");//select the input text that exist in the add-task class
let theAddButton=document.querySelector(".add-task .plus");//select the "plus" classthat exist in the add-task class
let tasksContainer=document.querySelector(".tasks-content");
let noTasksMsg=document.querySelector(".no-tasks-message");
let tasksCount=document.querySelector(".tasks-count span");
let tasksCompleted=document.querySelector(".tasks-completed span");

//focus on input field when the page is loaded
window.onload=function(){
    theInput.focus();
};
//-------------------------------------------------------------------------------------------------
//function that handle the repeated tasks
function taskExist(task){
    //create a table of all tasks entred
    let tasks=document.querySelectorAll(".task-box");
    for(let i=0;i<tasks.length;i++){
        let taskText=tasks[i].textContent.trim().replace(`Delete`,``);
        console.log(`current task ${taskText} target task ${task}`);
        if(taskText===task){
            return true;//task already exists
        }
    }
    return false;// Task does not exist DO IT AFTER FINISH CHECKING THE WHOLE ARRAY OF TASKS
}
//-------------------------------------------------------------------------------------------------
// Function to add a new task
let countTasksAdded=0;//counter of added tasks
function addTask(){

    let taskText=theInput.value.trim();
    //check if the input is empty
    if (theInput.value===""){
        swal.fire({
            title:"Ooops...",
            text:"You need to enter a task",
            icon:"warning",// You can use 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText:"Got it!"
        });
    }
    //in case the input is not empty
    //the task already existe
    else if(taskExist(taskText)==true){
        Swal.fire({
            title:"Repeated Task!!",
            text:"You already have this task in your To Do List, Try to enter another Task!",
            icon:"error",// You can use 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText:"Got it!"
    });
    }
    // if non repeated task ;Append the new task to the list of tasks
    else{
        //remove the no task message
        noTasksMsg.remove();
        //create main span element (where task description will be displayed)
        let mainSpan=document.createElement("span");
        // Set the textContent of mainSpan (task description)
        mainSpan.textContent = taskText;
        //add class tospan
        mainSpan.className=`task-box`;

        //create delete button
        let deleteElement=document.createElement("button");
        //add text to delete button
        deleteElement.textContent=`Delete`;
        console.log(`Task description `,taskText);
        //add class to delete button
        deleteElement.className=`delete-element`;
        //add delete button to main span
        mainSpan.appendChild(deleteElement);

        //add the task to the container
        tasksContainer.appendChild(mainSpan);
        //empty the input
        theInput.value=``;
        //focus on the iput field
        theInput.focus();
        countTasksAdded++;
        tasksCount.textContent=countTasksAdded;
        
    }
}
//-------------------------------------------------------------------------------------------------
// Event listener to handle adding tasks
theAddButton.addEventListener("click",addTask);
theInput.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        addTask();
    }
});
//-------------------------------------------------------------------------------------------------
//DELETE TASKS
document.addEventListener("click",function(event){
    //find the delete button
    if(event.target.className=="delete-element"){
        //check if the node parent(task)related to the current delete button is a conpleted task(overlined)
        if(event.target.parentNode.classList.contains(`finished`)){
            completedTasks--;
            tasksCompleted.textContent=completedTasks;
        }
        //remove current task
        event.target.parentNode.remove();
        countTasksAdded--;
        tasksCount.textContent=countTasksAdded;}
    
    });
//-------------------------------------------------------------------------------------------------
//FINISH TASKS
let completedTasks=0;
tasksContainer.addEventListener("click",function(event){
    //event.target means the element that was clicked
    if(event.target.classList.contains("task-box")){
        //.toggle("finished") adds the class "finished" to the element if it doesn't have it, 
        //and removes it if it does.
        event.target.classList.toggle("finished");

        // Update completedTasks count based on the class change
        if(event.target.classList.contains(`finished`)){
            completedTasks++;
        }
        else {
            completedTasks--;
        }
    }
    tasksCompleted.textContent=completedTasks;

});
//-------------------------------------------------------------------------------------------------
//handle the count buttons