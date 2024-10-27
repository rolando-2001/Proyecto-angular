import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { map, Observable } from 'rxjs';
import { Dish } from '../interfaces/dish';
import { CartData } from '../interfaces/cart.data';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartData: CartData[] = [];

  private url = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) { }






  deleteCart(id: string): Observable<Cart> {
    console.log(id);
    this.cartData = this.cartData.filter(item => item.dish_id._id !== id);
    return this.http.delete<{ data: Cart }>(`${this.url}/${id}`)
      .pipe(map(response => response.data));
  }


  allCartData(): Observable<CartData[]> {
    return this.http.get<{ data: CartData[] }>(this.url).pipe(
      map(response => {
        this.cartData = response.data
        return this.cartData;
      })

    );
  }

  addCartData(dish: CartData): Observable<CartData[]> {
    const { _id: id, quantity, dish_id } = dish;
    const dishId = dish_id._id;

    const exist = this.cartData.some(item => item.dish_id._id === dishId);

    if (exist) {

      this.cartData = this.cartData.map(item => {
        if (item.dish_id._id === dishId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }
        return item;
      });
    } else {

      this.cartData.push(dish);
    }


    return this.http.post<{ data: Cart }>(this.url, { _id: dishId })
      .pipe(
        map(response => {
          return this.cartData;
        })
      );
  }



  getCartData(): CartData[] {
    return this.cartData;
  }

  decrementQuantity(dish: CartData): Observable<CartData[]> {
    const { _id, quantity, dish_id } = dish;
    const id = dish_id._id;
  
    // Verificamos si el plato ya está en el carrito
    const exist = this.cartData.some(item => item.dish_id._id === id);
  
    if (exist) {
      // Si el plato existe, solo decrementar la cantidad si es mayor a 1
      this.cartData = this.cartData.map(item => {
        if (item.dish_id._id === id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
        return item;
      });
    } else {
      // Si no existe, lo agregamos (esto debería ser un caso raro si solo se decrementa)
      this.cartData.push(dish);
    }
  
    // Enviamos la petición PUT al servidor para actualizar la base de datos
    return this.http.put<{ data: Cart }>(`${this.url}/${id}`, { _id: id })
      .pipe(
        map(response => {
          // Aquí puedes manejar la respuesta y actualizar el estado si es necesario
          return this.cartData;
        })
      );
  }
  
  


  getTotal(): number {
    return this.cartData.reduce((acc, item) => acc + item.dish_id.price * item.quantity, 0);
  }



}
