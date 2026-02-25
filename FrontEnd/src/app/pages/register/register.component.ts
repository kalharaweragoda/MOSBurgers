import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/EmployeeService';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private employeeService: EmployeeService) {}

  registerEmployee(): void {
    if (!this.name) {
      Swal.fire('Invalid Name', 'Please enter a valid name.', 'error');
      return;
    }

    if (!this.email || !this.validateEmail(this.email)) {
      Swal.fire(
        'Invalid Email',
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    if (!this.validatePassword(this.password)) {
      Swal.fire(
        'Weak Password',
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.',
        'error'
      );
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire('Password Mismatch', 'Passwords do not match.', 'error');
      return;
    }

    const employee: Employee = {
      id: null,
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.employeeService.addEmployee(employee).subscribe({
      next: ()=>{
        Swal.fire('Registered!', 'Employee successfully registered.', 'success');
      },
      error: (err)=>{
        if(err.status===400 && err.error){
          let errorMessage = '';
          let errorObj;

          try{
            errorObj = typeof err.error === 'string'?JSON.parse(err.error):err.error;
          }catch(e){
            console.error('Error parsing error response', e);
            errorObj = {}  
          } 

          if (typeof errorObj === 'object' && errorObj !== null) {
            errorMessage = Object.values(errorObj).join('<br>'); 
          } else {
            errorMessage = 'An unexpected error occurred';
          }

          Swal.fire('Error', errorMessage.trim(), 'error');
        }else {
          Swal.fire(
            'Error',
            'Something went wrong. Please try again.',
            'error'
          );
        }
      }
    });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  }
}
