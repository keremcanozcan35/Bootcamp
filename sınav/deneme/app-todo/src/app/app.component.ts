import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoPipe } from './todo.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, TodoPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todos: string[]  =  [] ;
  work : string = "";

  updateIndex : number = 0;
  updateWork : string = "";

  search : string = "";

  add(){
    this.todos.push(this.work);
    this.work = "";
  }

  deleteByIndex(index: number){
    const isConfirm = confirm("You want to delete this?");
    if(isConfirm){
      this.todos.splice(index,1);
    }
  }

  update(){
    this.todos[this.updateIndex] = this.updateWork;
    this.updateWork = "";
  }

  get(index: number){
    this.updateIndex = index;
    this.updateWork = this.todos[index];
  }

}
