import { Component } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../interfaces/dish';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  
  public dishes:Dish[] = [];

  constructor(private dishService:DishService) { }



  ngOnInit():void {
    this.dishService.getAllDishes().subscribe(data => {
        this.dishes = data;
    });
  }

}
