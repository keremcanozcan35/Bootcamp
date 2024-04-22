import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ProductModel } from '../models/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartModel } from '../models/shopping-cart.model';
import { ProductPipe } from '../pipes/product.pipe';
import { ShoppingCartPipe } from "../pipes/shopping-cart.pipe";
import { TrCurrencyPipe } from 'tr-currency';
import { ProductService } from '../../services/product.service';
import { OrderModel } from '../models/order.model';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping-carts',
  standalone: true,
  templateUrl: './shopping-carts.component.html',
  styleUrl: './shopping-carts.component.css',
  imports: [SearchComponent, FormsModule, ProductPipe, ShoppingCartPipe, TrCurrencyPipe]
})
export class ShoppingCartsComponent {
  shoppingCartSearch: string = '';
  productsFromHomePage: ProductModel[] = [];
 
  constructor(
    public _cart: ShoppingCartService,
    private _product: ProductService,
    private _order: OrderService,
    private _http: HttpClient
    ) { }

  increment(cart: ShoppingCartModel) {
    const product = this._product.products.find(p => p.id == cart.productId);
    if (product !== undefined) {
      if (product.stock > 0) {
        cart.quantity++;
        this._http.put("http://localhost:5000/shoppingCarts/" + cart.id, cart).subscribe( () => this._cart.getAll());

        product.stock--;
        this._http.put("http://localhost:5000/products/" + product.id, product).subscribe(()=> this._product.getAll());
      }
    }
  }

  decrement(cart: ShoppingCartModel) {
    const product = this._product.products.find(p => p.id == cart.productId);
    if (product !== undefined && cart.quantity > 0) {

      if (product.stock > 0) {
        cart.quantity--;
        this._http.put("http://localhost:5000/shoppingCarts/" + cart.id, cart).subscribe( () => this._cart.getAll());

        product.stock++;
        this._http.put("http://localhost:5000/products/" + product.id, product).subscribe(()=> this._product.getAll());

      }
    } if(cart.quantity == 0){
      this.deleteByIndex(this._cart.shoppingCarts.indexOf(cart));
    }
  }

  deleteByIndex(index: number) {
    const cart = this._cart.shoppingCarts[index];
    const product = this._product.products.find(p => p.id == cart.productId);


    if (product !== undefined) {
      product.stock += cart.quantity;

      this._http.put(`products/$(product.id)`, product).subscribe({
        next: () => {
          this._product.getAll();
        },
        error: (err) => {
          console.log(err);
        }
       });
    }
    this._http.delete("http://localhost:5000/shoppingCarts/" + cart.id).subscribe({
      next: () => {
        this._cart.getAll();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  pay(form: NgForm) {
    if (form.valid) {
      for (const data of this._cart.shoppingCarts) {
        const amount = data.quantity * data.discountedPrice;
        const kdv = amount - amount / ((data.kdvRate / 100) + 1);

        let lastOrderSuffix = 0;
        this._order.getAll(()=>{
          if (this._order.orders.length > 0) {
            lastOrderSuffix = this._order.orders[this._order.orders.length - 1].orderNumberSuffix;
          }
  
          const order: OrderModel = {
            id: "123",
            date: new Date().toString(),
            kdvRate: data.kdvRate,
            price: data.price,
            productName: data.name,
            productDescription: data.description,
            quantity: data.quantity,
            imgUrl: data.imageUrl,
            total: amount,
            totalAmount: amount - kdv,
            totalKDV: kdv,
            orderNumberPrefix: "KCO" + new Date().getFullYear(),
            orderNumberSuffix: lastOrderSuffix + 1,
            orderNumber: ""
          };

          order.orderNumber = order.orderNumberPrefix + order.orderNumberSuffix.toString().padStart(9, '0');
    
          this._http.post("http://localhost:5000/orders", order).subscribe();
         
          this._http.delete("http://localhost:5000/shoppingCarts/" + data.id).subscribe();
  
        });
        
       
      }
      setTimeout(() => {
      this._cart.getAll();}, 300);
    }
  }


}
