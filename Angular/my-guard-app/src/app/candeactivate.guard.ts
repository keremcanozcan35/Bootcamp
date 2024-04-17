import { CanDeactivateFn } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const canDeactivate: CanDeactivateFn<HomeComponent> = (component, currentRoute, currentState, nextState) => {
  return confirm('Are you sure you want to leave from HomeComponent?');
};
