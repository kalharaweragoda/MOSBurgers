import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { CartService } from '../../services/CartService';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent {
  @Input()
  public item: any;

  constructor(private cartService: CartService) {}

  faCartShopping = faCartShopping;

  getImage(type: string): string {
    return this.imageMap[type.toLowerCase()];
  }

  imageMap: { [key: string]: string } = {
    burger: 'assets/images/burger-3.jpg',
    submarine: 'assets/images/submarine-2.png',
    fries: 'assets/images/fries-2.png',
    pasta: 'assets/images/pasta-2.png',
    chicken: 'assets/images/chicken.png',
    drinks: 'assets/images/beverages-2.png',
  };

  addToCart(item: Product) {
    const added = this.cartService.addToCart(item);
    if (added) {
      Swal.fire('Success!','Added to cart!','success');
    } else {
      Swal.fire('Oops!','Item already in cart!', 'info');
    }
  }
}
