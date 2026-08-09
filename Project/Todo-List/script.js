const todos = [];
const input = document.querySelector("input");
const btnAdd = document.querySelector(".btn-add");
const todoBox = document.querySelector(".todo-list");


const ui = ()=>{
    todoBox.innerHTML = todos.map((todo,idx)=>`
    <div class="li">
        <h3>${todo.task}</h3>
        <div>
          <button class="btn edit">Edit</button>
          <button onclick="deleteCard(${idx})" class="btn del">Delete</button>
        </div>
      </div>`).join("");
}


const addTask = ()=>{
    
    const val = input.value;
    if(val.trim() === "") return;
    todoBox.innerHTML = "";
    todos.push({task:val});
    console.log(todos)
    ui();
    input.value = "";
}


input.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        addTask();
    }
})

btnAdd.addEventListener("click",addTask);



function deleteCard(id){
    todos.splice(id,1);
    ui();
}