import { Component, Injectable } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { ProductModel } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartModel } from '../models/shopping-cart.model';
import { ProductPipe } from '../pipes/product.pipe';
import { ShoppingCartPipe } from "../pipes/shopping-cart.pipe";
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-shopping-carts',
    standalone: true,
    templateUrl: './shopping-carts.component.html',
    styleUrl: './shopping-carts.component.css',
    imports: [SearchComponent, FormsModule, ProductPipe, ShoppingCartPipe]
})
@Injectable()
export class ShoppingCartsComponent {

  shoppingCartSearch: string = '';
  productsFromHomePage: ProductModel[] = [];

  constructor(private cart: ShoppingCartService) {
    this.productsFromHomePage = this.cart.shoppingCarts;
   
  }

  increment(product: ProductModel){
    if(product.quantity < product.stock){
      product.quantity++;
    }
  }

decrement(product: ProductModel){  
  if(product.quantity > 0){
    product.quantity--;   
  }else if(product.quantity === 0){
    
  }


}

deleteByIndex(index : number) {
  //delete my products from list  
  this.productsFromHomePage.splice(index,1);
  
}



}
