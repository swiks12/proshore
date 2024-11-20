// [] i s atruthy vakues which always true regardless of it contains value or not

const api="http://localhost:3000/todos";
var todos=JSON.parse(localStorage.getItem("todos")) || [] ;

// selectors
const todoTextFieldValue=document.querySelector("#todo-txt-field");
const createBtn=document.querySelector("#todo-create-btn");
const getTodoContainer=document.querySelector(".todo-container");



// functions
const fetchedTodo=async()=>{
    const response=await fetch(api);
    const todos=await response.json();
    return todos;
    // console.log(todos)
}


const handleComplete=(completeId)=>{
    const updateStatus={completed:true};
    const response=fetch(`http://localhost:3000/todos/${completeId}`,{method:'PATCH',headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(updateStatus)})
    
}


// passing the index of the todo-item to be deleted
// const handleDelete=(index)=>{
//     // splice ma first parameter is index and second is how many items to delete from that index
//     todos.splice(index,1);
//     console.log(todos)
//     localStorage.setItem("todos",JSON.stringify(todos));
//     // updating the dom to reflect the changes
//     // this step removes the need to refresh the page to see the deleted dom
//     // querySelectorAll gives a nodelist ani we can remove the particular node to update the dom
//     const updateDOM=document.querySelectorAll(".todo-parent-div");
//     updateDOM[index].remove();
// }

handleDelete=(deleteId)=>{
    // alert(`The delete id is ${deleteId}`);
    const response=fetch(`http://localhost:3000/todos/${deleteId}`,{method:'DELETE'})
}

const handleCreate=()=>{
    var todoValue=todoTextFieldValue.value;
    const newTodo={todoText:todoValue,completed:false}
    const response=fetch(api,{method:'POST',
        headers:{
            // content ko type chai json vanera bujhne kaam ko lagi ho yo
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newTodo)
    })
    // if(todo!=""){
    //     var todoArray=fetchedTodosLocalStorage();
    //     let flag=0;
    //     // to make sure there are no duplicate entries of todo
    //         for (let i = 0; i < todoArray.length; i++) {
    //             if(todo===todoArray[i]){
    //                 // increment the value of flag when duplicacy found
    //                 flag+=1
    //             }
    //         }
    //         if (flag==0) {
    //             todos.push(todo);
    //         }
    //         else{
    //             alert("Todo Already exists! 😉")
    //         }
    // }
    // else{
    //     alert("Input your todo first! 😭")
    // }
    // // JSON.stringify to store the todo in more formatted way rather than plain text
    // localStorage.setItem("todos",JSON.stringify(todos));
    

}

const getTodos=async()=>{
    var fetchedTodos=await fetchedTodo();
    console.log(fetchedTodos,"from this")
    console.log(fetchedTodos.length);
    for (let i = 0; i < fetchedTodos.length; i++) {
        var parentDiv=document.createElement("div");
        var btnDiv=document.createElement("div");
        var pEl=document.createElement("p");
        var tickBtn=document.createElement("button");
        var crossBtn=document.createElement("button");
        tickBtn.innerHTML='<span class="material-symbols-outlined">check</span>';
        crossBtn.innerHTML='<span class="material-symbols-outlined">close</span>'
        // creating a div to put what needs to be shown in a container so that not all items are considered seperate children
        parentDiv.classList.add("todo-parent-div")
        btnDiv.classList.add("todo-btn-div")
        pEl.classList.add("todo-item")
        tickBtn.classList.add("tick-btn")
        crossBtn.classList.add("cross-btn")
        console.log(fetchedTodos[i].todoText)
        pEl.innerText=fetchedTodos[i].todoText;
        getTodoContainer.appendChild(parentDiv);
        parentDiv.appendChild(pEl);
        parentDiv.appendChild(btnDiv)
        btnDiv.appendChild(tickBtn);
        btnDiv.appendChild(crossBtn);


        // // event listeners
        // tickBtn.addEventListener("click", (e) => {
        //     const completedItem = e.target.closest(".todo-parent-div"); // Get the parent div
        //     completedItem.classList.add("todo-completed");
        // });
        
        // crossBtn.addEventListener("click", (e) => {
        //     const todoDiv = e.target.closest(".todo-parent-div"); // Find the clicked todo
        //     const todoIndex = Array.from(getTodoContainer.children).indexOf(todoDiv); // Get its index
        //     handleDelete(todoIndex);
        // });
        crossBtn.addEventListener("click",()=>{
            handleDelete(fetchedTodos[i].id)
        })

        tickBtn.addEventListener("click",()=>{
            handleComplete(fetchedTodos[i].id)
        })
    }
}
getTodos();


// event listeners
createBtn.addEventListener("click",handleCreate);


