import { Injectable } from '@angular/core';
import { ShoppingCartModel } from '../components/models/shopping-cart.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCarts : ShoppingCartModel[] = [];

  total: number = 0;
  totalAmount: number = 0;
  totalKDV: number = 0;
  totalKDV1: number = 0;
  totalKDV10: number = 0;
  totalKDV20: number = 0;

  currentMessage:any = "";
  constructor(private _htpp : HttpClient) {
    this.getAll();
   }
   
   getAll(){
     this._htpp.get<ShoppingCartModel[]>('http://localhost:5000/shoppingCarts').subscribe({
       next: (res) => {
         this.shoppingCarts = res;
         this.calculateTotal();
       },
       error: (err: HttpErrorResponse) => {
         console.log(err);
       }
     })
   }

   calculateTotal() {
    this.total = 0;
    this.totalAmount = 0;
    this.totalKDV = 0;

    for (const data of this.shoppingCarts) {
      const amount = data.quantity * data.discountedPrice;
      const kdv = amount - amount / ((data.kdvRate / 100) + 1);
      this.totalAmount += amount - kdv;
      if (data.kdvRate === 1) {
        this.totalKDV1 += kdv;
      }
      else if (data.kdvRate == 10) {
        this.totalKDV10 += kdv;
      }
      else if (data.kdvRate == 20) {
        this.totalKDV20 += kdv;
      }
      this.total += amount;

    }
  }


}
