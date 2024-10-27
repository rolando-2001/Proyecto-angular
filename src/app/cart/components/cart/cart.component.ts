import { Component, Input } from '@angular/core';
import { Dish } from '../../interfaces/dish';
import { CartService } from '../../services/cart.service';
import { CartData } from '../../interfaces/cart.data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @Input()
  public dishes: Dish[] = [];



  constructor(private cartService: CartService) { }



  addData(dish: Dish): void {
    
    const data: CartData = {
      _id: new Date().getTime().toString(),
      dish_id: dish,
      quantity: 1
    };
    console.log("Objeto dish en JSON: Cart", JSON.stringify(data, null, 2))
    this.cartService.addCartData(data).subscribe();
  }



}
