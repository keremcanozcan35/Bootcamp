import { Injectable } from '@angular/core';
import { ShoppingCartModel } from '../components/models/shopping-cart.model';
import { ProductModel } from '../components/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  product : ProductModel[] = []
  constructor() { }
}
