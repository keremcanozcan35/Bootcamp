import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CategoryPipe } from './components/pipes/category.pipe';
import { CommonModule } from '@angular/common';
import { ProductPipe } from './components/pipes/product.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template:"<router-outlet></router-outlet>"
})
export class AppComponent {}
