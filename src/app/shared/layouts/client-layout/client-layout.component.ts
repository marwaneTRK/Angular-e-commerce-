import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-client-layout',
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {
    count$ = this.cartService.cart$.pipe(map(cart => cart.reduce((sum, i) => sum + i.quantity, 0))
  );
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {

  }
  


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
