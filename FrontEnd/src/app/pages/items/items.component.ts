import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/ProductService';
import { CommonModule} from '@angular/common';
import { ItemCardComponent } from '../../common/item-card/item-card.component';

@Component({
  selector: 'app-items',
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  productsList: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.loadProducts().subscribe((data: Product[]) => {
      this.productsList = data;
      this.onSelected('0');
    });
  }

  onSelected(value: string) {
    switch (value) {
      case '1':
        this.filterProducts('BURGER');
        break;
      case '2':
        this.filterProducts('SUBMARINE');
        break;
      case '3':
        this.filterProducts('FRIES');
        break;
      case '4':
        this.filterProducts('PASTA');
        break;
      case '5':
        this.filterProducts('CHICKEN');
        break;
      case '6':
        this.filterProducts('DRINKS');
        break;
      default:
        this.filteredProducts = this.productsList;
    }
  }

  filterProducts(value: string) {
    this.filteredProducts = this.productsList.filter((product: Product) => {
      return product.itemType === `${value}`;
    });
  }
}
