import { Injectable } from '@angular/core';
import { ProductModel } from '../components/models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModel[] = []

  constructor(private _http: HttpClient) {
    this.getAll();  //2.46.25
  }

  getAll() {
    this._http.get<ProductModel[]>("http://localhost:5000/products").subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }


}
