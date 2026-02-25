import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/CartService';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Customer } from '../../models/Customer';
import { CartData } from '../../models/CartData';

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent {
  constructor(public modalRefCustomer:MdbModalRef<AddCustomerComponent>, private cartService:CartService) { }
  customer = {
    name: '',
    email: '',
    phoneNumber: '',
  };

  closeModal() {
    this.modalRefCustomer.close();
  }

  registerCustomer(): void {
      let customer: Customer = {
        id: null,
        name: this.customer.name,
        email: this.customer.email,
        phoneNo: this.customer.phoneNumber,
      };
      this.cartService.addCustomer(customer).subscribe({
        next: () => {
          Swal.fire(
            'Registered!',
            'Customer successfully registered.',
            'success'
          );
          
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            let errorMessage = '';
            let errorObj;
  
            try {
              errorObj =
                typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
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
    }
}
