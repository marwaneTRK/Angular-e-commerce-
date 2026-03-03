import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../core/models/cart-tem.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cart: CartItem[] = [];
  total = 0;

  ngOnInit() {
    this.load();
  }
  constructor(private cartService: CartService) { }
  load() {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  increase(id: number) {
    this.cartService.increase(id);
    this.load();
  }

  decrease(id: number) {
    this.cartService.decrease(id);
    this.load();
  }

  remove(id: number) {
    this.cartService.remove(id);
    this.load();
  }
}
