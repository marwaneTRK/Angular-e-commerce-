// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class ProductService {

//   products = [
//     {
//       id: 1,
//       title: 'Fjallraven Backpack',
//       price: 109.95,
//       category: "men's clothing",
//       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
//       description: 'Your perfect pack...',
//       rating: { rate: 3.9 }
//     },
//     {
//       id: 2,
//       title: 'Mens Cotton Jacket',
//       price: 55.99,
//       category: "men's clothing",
//       image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
//       description: 'Great outerwear...',
//       rating: { rate: 4.7 }
//     }
//   ];

//   getAll() {
//     return [...this.products];
//   }

//   getById(id: number) {
//     return this.products.find(p => p.id === id);
//   }

//   update(id: number, data: any) {
//     const index = this.products.findIndex(p => p.id === id);
//     if (index !== -1) {
//       this.products[index] = { ...this.products[index], ...data };
//     }
//   }

//   add(product: any) {
//     product.id = Date.now();
//     this.products.push(product);
//   }

//   delete(id: number) {
//   this.products = this.products.filter(p => p.id !== id);
// }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private api = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
   

  add(product:any){
  }
    update(id:number,data:any){
  }

  delete(id:number){

  }
}
