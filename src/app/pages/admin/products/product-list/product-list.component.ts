import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { ConfirmModalComponent } from '../../../../shared/ui/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../core/models/product.model';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, ConfirmModalComponent,LoaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  showModal = false;
  loading: boolean = false;
  selectedId!: number;
  constructor(private productService: ProductService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAll().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  openModal(id: number) {
    this.selectedId = id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDelete() {
    this.productService.delete(this.selectedId);
    this.toastr.success('Produit supprimé avec succès');
    this.getAllProduct();
    this.closeModal();
  }
}
