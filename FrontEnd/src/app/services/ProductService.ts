import { Injectable } from '@angular/core';
import { env } from '../env/env.test';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${env.baseUrl}`;

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/items`);
  }

  addProduct(product: any) {
    return this.http.post(`${this.baseUrl}/dashboard`, product, {
      responseType: 'text',
    });
  }
}
