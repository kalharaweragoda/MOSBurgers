import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { env } from '../env/env.test';
import { CartData } from '../models/CartData';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private baseUrl = `${env.baseUrl}`;
  constructor(private http: HttpClient) {}

  addToCart(product: Product): boolean {
    const exists = this.cart.some((p) => p.itemCode === product.itemCode);
    if (!exists) {
      this.cart.push(product);
      return true;
    }
    return false;
  }

  removeFromCart(index: number): void {
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  removeAll():void{
    this.cart.length=0;
  }

  addCustomer(customer: Customer) {
    return this.http.post(`${this.baseUrl}/cart/customer`, customer, {
      responseType: 'text',
    });
  }

  getCart(): Product[] {
    return this.cart;
  }

  getData() {
    return this.http.get<CartData>(`${this.baseUrl}/cart`);
  }

  placeOrder(
    order: Order,
    productIdToQuantityMap: { [id: number]: number }
  ): Observable<any> {
    let payload = { order, productIdToQuantityMap };
    return this.http.post(`${this.baseUrl}/cart`, payload, {
      responseType: 'text',
    });
  }
}
