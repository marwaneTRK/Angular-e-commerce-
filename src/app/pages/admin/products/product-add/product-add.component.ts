import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

  form = this.fb.group({
    title: ['', Validators.required],
    price: [0, Validators.required],
    category: ['', Validators.required],
    description: ['']
  });

  constructor(private fb: FormBuilder, private router: Router, private productService:ProductService) {}

  submit() {
    console.log(this.form.value);
        this.productService.add(this.form.value);

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