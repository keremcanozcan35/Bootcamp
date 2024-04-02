import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoModel } from './models/todo.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  addModel: TodoModel = new TodoModel();
  updateModel: TodoModel = new TodoModel();

  updateIndex: number = 0;
  isUpdateFormActive: boolean = false;

  todos: TodoModel[] = [];

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<TodoModel[]>('http://localhost:5001/todos')
      .subscribe(res => {
        this.todos = res;
      })
  }

  save() {

    const uniqueId = this.generateUniqueId();

    // Assign the generated ID to the addModel
    this.addModel.id = uniqueId;
    this.http.post('http://localhost:5001/todos', this.addModel)
      .subscribe(res => {
        this.getAll();
        this.addModel = new TodoModel();

      

        Swal.fire({
          title: 'Create is successful!',
          showCloseButton: false,
          timer: 3000,
          position: "bottom-right",
          toast: true,
          icon: 'success',
          showConfirmButton: false
        })
      })

  }
  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // This is just a simple example, not guaranteed unique
  }

  get(index: number) {
    this.updateModel = this.todos[index];
    this.updateIndex = index;
    this.isUpdateFormActive = true;
  }

  changeCompleted(data: TodoModel) {
    this.http.put(`http://localhost:5001/todos/${data.id}`, data)
      .subscribe(() => {
        this.getAll();
      })
  }

  update() {
    this.todos[this.updateIndex] = this.updateModel;
    this.isUpdateFormActive = false;


    Swal.fire({
      title: 'Update is successful!',
      showCloseButton: false,
      timer: 3000,
      position: "bottom-right",
      toast: true,
      icon: 'info',
      showConfirmButton: false
    })
  }

  remove(index: number) {
    Swal.fire({
      title: 'You want to delete this record?',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonText: "Delete",
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.todos.splice(index, 1);
      }
    })

  }
}
