import { Component, Injectable, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { ProductModel } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartModel } from '../models/shopping-cart.model';
import { ProductPipe } from '../pipes/product.pipe';
import { ShoppingCartPipe } from "../pipes/shopping-cart.pipe";
import { BehaviorSubject } from 'rxjs';
import { TrCurrencyPipe } from 'tr-currency';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shopping-carts',
  standalone: true,
  templateUrl: './shopping-carts.component.html',
  styleUrl: './shopping-carts.component.css',
  imports: [SearchComponent, FormsModule, ProductPipe, ShoppingCartPipe, TrCurrencyPipe]
})
export class ShoppingCartsComponent implements OnInit {

  shoppingCartSearch: string = '';
  productsFromHomePage: ProductModel[] = [];
  total: number = 0;
  totalAmount: number = 0;
  totalKDV: number = 0;
  totalKDV1: number = 0;
  totalKDV10: number = 0;
  totalKDV20: number = 0;

  constructor(public cart: ShoppingCartService, private _product: ProductService) { }

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.totalAmount = 0;
    this.totalKDV = 0;

    for (const data of this.cart.shoppingCarts) {
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

  increment(cart: ShoppingCartModel) {
    const product = this._product.products.find(p => p.id == cart.id);
    if(product !== undefined) {
      if (product.stock > 0) {
        cart.quantity++;
        product.stock--;
        this.calculateTotal();
      }
    }
  }

  decrement(cart : ProductModel, index: number) {
    const product = this._product.products.find(p => p.id == cart.id);
    if(product !== undefined && cart.quantity > 0) {

      if (product.stock > 0) {
        cart.quantity--;
        product.stock++;
        this.calculateTotal();
      }if(cart.quantity === 0){
        this.deleteByIndex(index);
      }
    }
  }

  deleteByIndex(index: number) {
    const cart = this.cart.shoppingCarts[index];
    const data = this._product.products.find(p => p.id == cart.id);
    if (data !== undefined) {
      data.stock += cart.quantity;
    }
    this.cart.shoppingCarts.splice(index, 1);
    this.calculateTotal();
  }
}
