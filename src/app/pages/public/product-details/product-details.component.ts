import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { Product } from '../../../core/models/product.model';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ButtonComponent,LoaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  loading:boolean =true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
      private cartService: CartService,

  ) {}
addToCart() {
  this.cartService.add(this.product);
}

ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getById(id).subscribe({
      next: data => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
