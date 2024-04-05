import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  transform(value: CategoryModel[], filter2: string): CategoryModel[] {
    return value.filter(p => p.name.toLocaleLowerCase().includes(filter2.toLocaleLowerCase()));
  }

}
