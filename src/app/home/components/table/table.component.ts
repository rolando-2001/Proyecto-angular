import { Component, Input, OnInit } from '@angular/core';
import { CartData } from '../../../cart/interfaces/cart.data';
import { CartService } from '../../../cart/services/cart.service';
import { Dish } from '../../../cart/interfaces/dish';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

 

  
  public buttonStates: { [key: string]: boolean } = {}; 




  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartData();
    
  }

  delete(dish: CartData): void {
    const { _id, dish_id } = dish;
    const id = dish_id._id;
    this.cartService.deleteCart(id).subscribe();

  }


  



  
  loadCartData() {
    this.cartService.allCartData().subscribe(data => {
      
      data.forEach(item => {
        this.buttonStates[item.dish_id._id] = true;
        
      });
    });

  }

  add(dish: CartData) {

    
    this.cartService.addCartData(dish).subscribe(
      () => {
        this.disableButton(dish.dish_id._id, 1);
      }
    );
  }

  get cartItems(): CartData[] {
    return this.cartService.getCartData(); 
  }  


  dataDecrement(dish: CartData) {
    
      this.cartService.decrementQuantity(dish).subscribe();
    
  }

  

  total(): number {
    return this.cartService.getTotal();
  } 


  disableButton(itemId: string, seconds: number): void {
    this.buttonStates[itemId] = false; 

    setTimeout(() => {
      this.buttonStates[itemId] = true; 
    }, seconds * 1000);
  }




}
