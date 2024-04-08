import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from '../pipes/category.pipe';
import { ProductPipe } from '../pipes/product.pipe';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { SearchComponent } from '../search/search.component';
import { TrCurrencyPipe } from 'tr-currency';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CategoryPipe, CommonModule, ProductPipe, SearchComponent, TrCurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories: CategoryModel[] = [];

  categorySearch: string = "";
  productSearch: string = "";
  selectedCategoryId: string = "";

  constructor(private cart: ShoppingCartService,
    public _product: ProductService
  ) {
    setTimeout(() => {
      this.seedData();
    }, 1000);
  }

  selectCategory(id: string = "") {
    this.selectedCategoryId = id;
  }

  decrementProductQuantity(product: ProductModel) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  incrementProductQuantity(product: ProductModel) {
    if (product.quantity < product.stock) {
      product.quantity++;
    }
  }

  addShoppingCart(product: ProductModel) {
    const productModel = { ...product };

    const model = this.cart.shoppingCarts.find(x => x.id == product.id);
    if (model === undefined) {
      this.cart.shoppingCarts.push(productModel);
    } else {
      model.quantity += productModel.quantity;
    }

    product.stock -= product.quantity;
  }

  seedData() {
    this.categories = [
      {
        id: "1",
        name: "Elektronik"
      },
      {
        id: "2",
        name: "Meyve & Sebze"
      },
      {
        id: "3",
        name: "Kıyafet"
      }
    ];
  }
}