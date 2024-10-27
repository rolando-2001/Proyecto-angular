import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Dish } from '../interfaces/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {


  //List of dishes
  private url = 'http://localhost:3000/api/dish';


  constructor(private http: HttpClient) { }


  getAllDishes(): Observable<Dish[]> {

    return this.http.get<{ data: Dish[] }>(this.url)
      .pipe(map(response => response.data))
      .pipe(catchError(() => of([])));
  }


  

}
