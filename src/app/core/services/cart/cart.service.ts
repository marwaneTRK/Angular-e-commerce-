import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/cart-tem.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private storageKey = 'cart';

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  cart$ = this.cartSubject.asObservable();

  private loadFromStorage(): CartItem[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private update(cart: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  add(product: any) {
    const cart = [...this.getCart()];

    const item = cart.find(i => i.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }

    this.update(cart);
  }

  increase(productId: number) {
    const cart = [...this.getCart()];
    const item = cart.find(i => i.product.id === productId);

    if (item) {
      item.quantity++;
      this.update(cart);
    }
  }

  decrease(productId: number) {
    const cart = [...this.getCart()];
    const item = cart.find(i => i.product.id === productId);

    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
      this.update(cart);
    } else {
      this.remove(productId);
    }
  }

  remove(productId: number) {
    const cart = this.getCart().filter(
      i => i.product.id !== productId
    );
    this.update(cart);
  }

  clear() {
    this.update([]);
  }


  getTotal(): number {
    return this.getCart().reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  getCount(): number {
    return this.getCart().reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
}
