import { Routes, mapToCanDeactivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {  canDeactivate } from './candeactivate.guard';
import { canactivateGuard } from './canactivate.guard';
import { LayoutsComponent } from './layouts/layouts.component';
import { canactivatechildGuard } from './canactivatechild.guard';
import { LoginComponent } from './login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const routes: Routes = [
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"",
        component: LayoutsComponent,
        //canActivateChild: [canactivatechildGuard],
        canActivateChild: [()=> inject(AuthService).isAuthenticated()], //functional guard
        children: [
            {
                path:"home",
                component : HomeComponent,
                canDeactivate: [canDeactivate]
            },
            {
                path:"about",
                component : AboutComponent,
                canDeactivate: [canDeactivate]
            },
            {
                path:"contact",
                component : ContactComponent
            }
        ]
    }
    
];
