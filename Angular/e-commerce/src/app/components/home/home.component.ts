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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ShoppingCartModel } from '../models/shopping-cart.model';

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

  constructor(private _cart: ShoppingCartService,
    public _product: ProductService,
    private _http: HttpClient
  ) {
    this.getAllCategories();
  }

  getAllCategories() {
    this._http.get<CategoryModel[]>("http://localhost:5000/categories").subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
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

    const model = this._cart.shoppingCarts.find(x => x.productId == product.id);
    if (model === undefined) {
      //Eğer sepete eklenen ürün sepette yoksa ürünü sepete ekle.
      const cart: ShoppingCartModel = {
        productId: product.id,
        categoryId: product.categoryId,
        description: product.description,
        discountedPrice: product.discountedPrice,
        imageUrl: product.imageUrl,
        kdvRate: product.kdvRate,
        name: product.name,
        price: product.price,
        quantity: productModel.quantity,
        category: product.category,
        id: undefined
      };

      this._http.post("http://localhost:5000/shoppingCarts/", cart).subscribe({
        next: () => {
          this._cart.getAll();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    } else {

      //eğer sepette ürün varsa adedini güncelle ve api isteği ile kayıtta bilgisini değiştir
      model.quantity += productModel.quantity;

      this._http.put("http://localhost:5000/shoppingCarts/" + model.id, model).subscribe({
        next: () => {
          this._cart.getAll();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });

    }

    product.stock -= product.quantity;


    this._http.put("http://localhost:5000/products/" + product.id, product).subscribe({
      next: () => {
        this._cart.getAll();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });

  }

}