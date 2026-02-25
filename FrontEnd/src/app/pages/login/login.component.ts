import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { env } from '../../env/env.test';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login():void{
    this.http.post<any>(`${env.baseUrl}/login`, {email: this.email, password: this.password}).subscribe({
      next: response => {
        Swal.fire('Successfully logged In',response.message, 'success')
        localStorage.setItem('token', response.token);
        this.router.navigate(['dashboard'])},
      error: error => Swal.fire('Error',error.error?.error||'Login failed', 'error')
  })}
}
