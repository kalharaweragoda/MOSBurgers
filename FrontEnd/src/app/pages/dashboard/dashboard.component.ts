import { Component } from '@angular/core';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../models/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MdbModalRef,
  MdbModalService,
  MdbModalModule,
} from 'mdb-angular-ui-kit/modal';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, MdbModalModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private productService: ProductService,
    private modalService: MdbModalService
  ) {
    this.productService
      .loadProducts()
      .subscribe((data) => (this.products = data));
  }
  products: Product[] = [];
  filters = ['quantity', 'price', 'discount'];
  order = ['ascending', 'descending'];
  selectedFilter: string = '';
  selectedOrder: string = '';
  modalRef: MdbModalRef<UpdateProductComponent> | null = null;
  item: any = {};

  onFilterChange(): void {
    if (!this.selectedFilter || !this.selectedOrder) return;

    const direction = this.selectedOrder === 'ascending' ? 1 : -1;

    this.products.sort((a: Product, b: Product) => {
      switch (this.selectedFilter) {
        case 'price':
          return (a.unitPrice - b.unitPrice) * direction;
        case 'quantity':
          return (a.quantityInStock - b.quantityInStock) * direction;
        case 'discount':
          return (a.discount - b.discount) * direction;
        default:
          return 0;
      }
    });
  }

  openModal(product: Product) {
    this.modalRef = this.modalService.open(UpdateProductComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        item :product,
      },
      backdrop: true,
      keyboard: false,
      ignoreBackdropClick: true,
    });
  }
}
