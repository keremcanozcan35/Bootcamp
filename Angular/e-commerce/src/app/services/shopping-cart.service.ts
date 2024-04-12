import { Injectable } from '@angular/core';
import { ShoppingCartModel } from '../components/models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCarts : ShoppingCartModel[] = [
  
  ]
  currentMessage:any = "";
  constructor() { }
}
