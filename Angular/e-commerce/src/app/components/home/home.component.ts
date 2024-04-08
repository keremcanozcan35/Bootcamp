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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CategoryPipe, CommonModule, ProductPipe, SearchComponent,TrCurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories:CategoryModel[] = [
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

  products: ProductModel[] = [
    {
      id: "1",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfFFXV4zCJybOFvocqAKKkko37SsPbl9F66Q&usqp=CA",
      name: "Grundig Pc 2560 B1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: 12650,
      discountedPrice: 11999,
      stock: 10,
      kdvRate: 20,
      categoryId : "1",
      category: {
        id: "1",
        name: "Elektronik"
      },
      quantity: 1
    },
    {
      id: "2",
      imageUrl: "https://m.media-amazon.com/images/I/61ujQL9JflL._AC_SX679_.jpg",
      name: "Columbia Delta Ridge™ Down Erkek Mont",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      price: 11550,
      discountedPrice: 10999,
      stock: 4,
      kdvRate: 20,
      categoryId : "3",
      category: {
        id: "3",
        name: "Kıyafet"
      },
      quantity: 1
    }
  ]

  categorySearch: string = "";
  productSearch: string = "";
  selectedCategoryId: string = "";



  /**
   *
   */
  constructor(private cart: ShoppingCartService) {
  
  }



  selectCategory(id: string = "") {
    this.selectedCategoryId = id;
  }

  decrementProductQuantity(product:ProductModel){
    if(product.quantity > 1){
      product.quantity--;
    }
  }

  incrementProductQuantity(product:ProductModel){
    if(product.quantity < product.stock){
      product.quantity++;
    }
  }


  addShoppingCart(product:ProductModel){
    const productModel = {...product};

    const model = this.cart.shoppingCarts.find(x=>x.id == product.id);
    if(model === undefined){
      this.cart.shoppingCarts.push(productModel);
    }else{
      model.quantity += productModel.quantity;
    }
   
    product.stock -= product.quantity;
  }
}