import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { HomeComponent } from '../home/home.component';
import { ProductModel } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-carts',
  standalone: true,
  imports: [SearchComponent, FormsModule],
  templateUrl: './shopping-carts.component.html',
  styleUrl: './shopping-carts.component.css'
})
export class ShoppingCartsComponent {

  constructor(private cart: ShoppingCartService) {}

  productsFromHomePage: ProductModel[] = this.cart.shoppingCarts;



increment(product: ProductModel){
  const model = this.productsFromHomePage.find(p => p.id === product.id);
  if(model === undefined){
    this.productsFromHomePage.push(product);
  }
}

decrement(product: ProductModel){  


}

}
