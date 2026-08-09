let todos = [];

function addTodo(id,task){
    todos.push({
        id,
        task,
        completed: false
    })
}

function showTodos(){
    console.log("Todo list: ");
    todos.forEach(todo => {
        console.log(`${todo.id}. ${todo.task} - ${todo.completed?"Completed":"Pending"}`)
    })
}

function completeTodo(id){
    const todo = todos.find(todo => todo.id === id)
    if(todo){
        todo.completed = true;
    }
}

function deleteTodo(id){
    todos = todos.filter(todo => todo.id !== id)
}

// Add Todos
addTodo(1, "Learn JavaScript");
addTodo(2, "Practice reduce()");
addTodo(3, "Build a project");

showTodos();

completeTodo(2);

console.log("\nAfter Completing Task:");
showTodos();

deleteTodo(1);

console.log("\nAfter Deleting Task:");
showTodos();