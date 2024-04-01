import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoModel } from './models/todoModel';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  addModel : TodoModel = new TodoModel();
  updateItem: TodoModel = new TodoModel();

  todos: TodoModel[] = [];
  

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll(){
    this.http.get<TodoModel[]>('http://localhost:5001/todos').subscribe(response => {
      this.todos = response;
      console.log(response[0]);
    });
  }
 

  save(){
    this.http.post('http://localhost:5001/todos', this.addModel).subscribe(response => {
      this.getAll();
      Swal.fire({
        title: "Create is successful",
        showCloseButton: false,
        showConfirmButton: false,
        timer: 3000,
        position: "bottom-right",
        toast: true,
        icon: "success"
      });
    });
  }

  changeCompleted(data : TodoModel) {
    this.http.put(`http://localhost:5001/todos/${data.id}`,data)
    .subscribe(response => {
      this.getAll();
    });
  }




}
