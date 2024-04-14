import { Injectable } from '@angular/core';
import { OrderModel } from '../components/models/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: OrderModel[] = [];

  constructor(private _http : HttpClient) {
    this.getAll();
   }


  getAll(callBack?: ()=> void){
    this._http.get<OrderModel[]>('http://localhost:5000/orders').subscribe({
      next: (res) => {
        this.orders = res;
        if(callBack !== undefined){
          callBack();
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
