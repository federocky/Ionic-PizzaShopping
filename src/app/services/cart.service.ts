import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name:string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [
    { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0 },
    { id: 1, name: 'Pizza Classic', price: 5.49, amount: 0 },
    { id: 2, name: 'Sliced Bread', price: 4.99, amount: 0 },
    { id: 3, name: 'Salad', price: 6.99, amount: 0 }
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  //agrega un producto
  addProduct(product) {
    ///comprobaremos si ya hay uno igual
    let added = false;

    //
    for (let p of this.cart) {
      //si hay uno igual
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }

    //si no hay uno igual
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    //actualizamos la cuenta.
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  //quita una unidad de producto
  decreaseProduct(product) {

    ///miramos cuantos de esos productos tengo
    for (let [index, p] of this.cart.entries()) {

      //buscamos el producto
      if (p.id === product.id) {

        //quitamos una unidad
        p.amount -= 1;

        //si nos quedamos en cero eliminamos el producto
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }

    //actualizamos la lista de productos en el carro
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 

  //elimina un producto
  removeProduct(product) {

    //buscamos un prod
    for (let [index, p] of this.cart.entries()) {

      //si lo encontramos
      if (p.id === product.id) {

        //actualizamos la cantidad de productos en el carro
        this.cartItemCount.next(this.cartItemCount.value - p.amount);

        //lo quitamos
        this.cart.splice(index, 1);
      }
    }
  }
}
