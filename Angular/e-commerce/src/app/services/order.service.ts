import { Injectable } from '@angular/core';
import { OrderModel } from '../components/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: OrderModel[] = [];

  constructor() { }
}
