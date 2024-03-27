declare const $:any;

class TodoModel {
    id: number = 0;
    work: string = "";
    isCompleted: boolean = false;
    createdDate : Date = new Date();
}

const todos : TodoModel[] = [];

${"#save"}.on("click", save1);

function save1(){
    const el = $("#work");

    const todo = new TodoModel();
    todo.work = el.val();
    todos.push(todo);
    setLiElements();
}


function setLiElements(){
    const el = $("#ulEl");
    let html = "";
    for(const todo of todos){
        html += `<li>${todo.work}</li>`
    }

    el.html(html);
}

function on(arg0: string, save: (event: any) => void) {
    throw new Error("Function not implemented.");
}
