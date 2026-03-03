import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product!: {
    id: number;
    title: string;
    image: string;
    category: string;
    price: number;
  };

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate([`/products/${this.product.id}/details`]);
  }
}
