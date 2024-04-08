import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingCartModel } from '../models/shopping-cart.model';

@Pipe({
  name: 'shoppingCart',
  standalone: true
})
export class ShoppingCartPipe implements PipeTransform {

  transform(value: ShoppingCartModel[], search: string): ShoppingCartModel[] {
    return value.filter(p => p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
