import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../../shared/ui/search-bar/search-bar.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Product } from '../../../core/models/product.model';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SearchBarComponent, ProductCardComponent,LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
 search = '';
 loading : boolean=true;

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
     this.productService.getAll().subscribe({
       next: data => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }});
  }

  filteredProducts() {
    return this.products
      .filter(p =>
        p.title.toLowerCase().includes(this.search.toLowerCase())
      );
  }
}
