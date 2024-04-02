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


  addModel: TodoModel = new TodoModel();
  updateItem: TodoModel = new TodoModel();

  todos: TodoModel[] = [];


  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<TodoModel[]>('http://localhost:5001/todos').subscribe(response => {
      this.todos = response;
      console.log(response[0]);
    });
  }


  save() {
    const uniqueId = this.generateUniqueId();
    this.addModel.id = uniqueId;
    this.http.post('http://localhost:5001/todos', this.addModel)
      .subscribe(response => {
        this.getAll();
        this.addModel = new TodoModel();
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

  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }


  changeCompleted(data: TodoModel) {

    this.http.put(`http://localhost:5001/todos/${data.id}`, data)
      .subscribe(() => {
    
        const backgroundOfCard = document.getElementById(`card-img${data.id}`) as HTMLImageElement;
        const backgroundOfCard2 = document.getElementById(`card-text${data.id}`);

        const backgroundOfCard3 = document.getElementById(`card-title${data.id}`) ;



        if (backgroundOfCard !== null && data.isCompleted == true && backgroundOfCard2 !== null && backgroundOfCard3 !== null) {
          backgroundOfCard2.style.color = "black";
          backgroundOfCard2.innerText = "CONGRATZ YOU HAVE COMPLETED YOUR TASK TODAY!";
          
          backgroundOfCard2.style.fontSize = "xx-large";
          backgroundOfCard2.style.textAlign = "center";
          backgroundOfCard.src = "https://cdn.pixabay.com/photo/2017/07/24/17/46/background-2535506_960_720.jpg";
         
        }
        else if (backgroundOfCard !== null && backgroundOfCard2 !== null && backgroundOfCard3 !== null) {
          backgroundOfCard.src = " https://media.istockphoto.com/id/185317608/tr/foto%C4%9Fraf/dark-texture-background-of-black-fabric.jpg?s=612x612&w=0&k=20&c=Gw4MKC32aWt0jF5LRM9r6qaPHvmnxAT6avpCXemzh7Y=";
          backgroundOfCard2.style.color = "white";
          backgroundOfCard2.innerText = data.text;
          backgroundOfCard2.style.fontSize = "unset";
          backgroundOfCard3.style.fontSize = "x-small";
        }
      });
  }



  remove(index: number) {
    Swal.fire({
      title: 'You want to delete this record?',
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "green",
      showConfirmButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      icon: 'error',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.todos.splice(index, 1);
      }
    })

  }
}




