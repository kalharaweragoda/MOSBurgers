import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/CartItem';
import Swal from 'sweetalert2';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../../common/modal/modal.component';
import { Router} from '@angular/router';
import { AddCustomerComponent } from '../add-customer/add-customer.component';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, MdbModalModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  modalRefCustomer: MdbModalRef<AddCustomerComponent> | null = null;

  constructor(
    private cartService: CartService,
    private modalService: MdbModalService,
    private router: Router,
  ) {
    this.products = this.cartService.getCart();
    this.products.forEach((product) => {
      const cartItem: CartItem = {
        id: product.id!,
        itemName: product.itemName,
        itemType: product.itemType,
        unitPrice: product.unitPrice,
        quantityInStock: product.quantityInStock,
        quantityAvailable: product.quantityInStock,
        quantity: 1,
        discount: product.discount,
        finalPrice:
          product.unitPrice - (product.unitPrice * product.discount) / 100,
      };
      this.cartItems.push(cartItem);
    });
  }

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

  updateFinalPrice(item: CartItem) {
    if (item.quantity < 1) {
      Swal.fire('Error', 'Quantity cannot be less than 1', 'error');
      item.quantity = 1;
    }

    if (item.quantity > item.quantityInStock) {
      Swal.fire('Error', 'Not enough quantity available', 'error');
      item.quantity = item.quantityInStock;
    }

    let totalPrice = item.unitPrice * item.quantity;
    item.finalPrice = totalPrice - (totalPrice * item.discount) / 100;

    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + (item.finalPrice || 0),
      0
    );
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartService.removeFromCart(index);
    this.calculateTotalPrice();
  }

  ngOnInit(): void {
    this.cartItems.forEach((item) => {
      this.updateFinalPrice(item);
    });
  }

  openModal() {
    if (this.totalPrice === 0) {
      Swal.fire('Error', 'Cart is empty', 'error');
      return;
    }
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        totalPrice: this.totalPrice,
        cartItems: this.cartItems,
      },

      backdrop: true,
      keyboard: false,
      ignoreBackdropClick: true,
    });
  }

  openCustomerModal(){
    this.router.navigate(['/cart/customer']).then(()=>{
      this.modalRefCustomer = this.modalService.open(AddCustomerComponent,{
        modalClass:'modal-dialog-centered',
        backdrop: true,
        keyboard: false,
        ignoreBackdropClick: true
      });

      this.modalRefCustomer.onClose.subscribe(()=>{
        this.router.navigate(['/cart'])
      })
    });
    
  }

  
}
