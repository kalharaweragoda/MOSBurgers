import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Employee } from '../../models/Employee';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { Customer } from '../../models/Customer';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../services/CartService';
import { CartData } from '../../models/CartData';
import { Order } from '../../models/Order';

interface PaymentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private cartService: CartService
  ) {
    this.cartService.getData().subscribe((data: CartData) => {
      this.listOfCustomers = data['customers'];
      this.listOfEmployees = data['employees'];
    });
  }

  listOfEmployees: Employee[] = [];
  listOfCustomers: Customer[] = [];
  customer = {
    name: '',
    email: '',
    phoneNumber: '',
  };

  selectedEmployeeId: number | null = null;
  selectedCustomerId: number | null = null;
  selectedEmployeeName: string = '';
  selectedCustomerName: string = '';
  totalPrice: number | null = null;
  cartItems: CartItem[] = [];
  today: string = new Date().toISOString().substring(0, 10);
  selectedPaymentType: string = '';

  onEmployeeChange(): void {
    const employee = this.listOfEmployees.find(
      (e) => e.id === Number(this.selectedEmployeeId)
    );
    this.selectedEmployeeName = employee ? employee.name : '';
  }

  onCustomerChange(): void {
    const customer = this.listOfCustomers.find(
      (c) => c.id === Number(this.selectedCustomerId)
    );
    this.selectedCustomerName = customer ? customer.name : '';
  }

  paymentTypes: PaymentType[] = [
    { value: 'cash', viewValue: 'Cash' },
    { value: 'card', viewValue: 'Card' },
  ];

  submitOrder(): void {
    if (
      this.selectedEmployeeId &&
      this.selectedCustomerId &&
      this.selectedPaymentType
    ) {
      let order: Order = {
        id: null,
        date: this.today,
        employeeId: Number(this.selectedEmployeeId),
        employeeName: this.selectedEmployeeName,
        customerId: Number(this.selectedCustomerId),
        total: this.totalPrice ? this.totalPrice : 0,
        paymentType: this.selectedPaymentType,
      };

      // creating product map
      let products: { [id: number]: number } = {};
      this.cartItems.forEach((item) => {
        products[item.id] = item.quantity;
      });

      this.cartService.placeOrder(order, products).subscribe({
        next: () => {
          Swal.fire('Success', 'Order submitted successfully!', 'success');
          this.cartItems.length = 0;
          this.cartService.removeAll();
          this.modalRef.close();
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            let errorMessage = '';
            let errorObj;

            try {
              errorObj =
                typeof err.error === 'string'
                  ? JSON.parse(err.error)
                  : err.error;
            } catch (e) {
              console.error('Error parsing error response', e);
              errorObj = {};
            }

            if (typeof errorObj === 'object' && errorObj !== null) {
              errorMessage = Object.values(errorObj).join('<br>');
            } else {
              errorMessage = 'An unexpected error occurred';
            }

            Swal.fire('Error', errorMessage.trim(), 'error');
          } else {
            Swal.fire(
              'Error',
              'Something went wrong. Please try again.',
              'error'
            );
          }
        },
      });
    } else {
      Swal.fire('Error', 'Please fill all the fields!', 'error');
    }
  }
}
