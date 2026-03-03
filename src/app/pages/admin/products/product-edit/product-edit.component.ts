import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  productId!: number;
  form!: any;
  product!: Product;
  loading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(this.productId).subscribe({
      next: data => {
        this.product = data;
        this.loading = false;

        if (!this.product) {
          this.router.navigate(['/admin/products']);
          return;
        }

        this.form = this.fb.group({
          title: [this.product.title, Validators.required],
          price: [this.product.price, Validators.required],
          category: [this.product.category, Validators.required],
          description: [this.product.description]
        });

      },
      error: () => {
        this.loading = false;
      }
    });



  }

  submit() {
    this.productService.update(this.productId, this.form.value);
    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  get title() {
    return this.form.get('title');
  }

  get price() {
    return this.form.get('price');
  }
  get category() {
    return this.form.get('category');
  }

  get description() {
    return this.form.get('description');
  }

}