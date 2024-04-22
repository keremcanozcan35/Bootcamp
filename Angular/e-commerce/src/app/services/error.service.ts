import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(err : HttpErrorResponse) {
    if(err.status === 404){
      console.log("404 Not Found");
    
    }

   }
}
