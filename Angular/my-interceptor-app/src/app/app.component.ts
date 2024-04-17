import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template:`
  <button (click)="get()">Get API Request</button>
  `
})
export class AppComponent {
  constructor(
    private http: HttpClient
  ) {}

  get(){
    this.http.get("").subscribe({
      next: (res : any) => {
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
}
