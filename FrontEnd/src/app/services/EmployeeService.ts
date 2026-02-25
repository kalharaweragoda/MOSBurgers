import { Injectable } from '@angular/core';
import { env } from '../env/env.test';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = `${env.baseUrl}`;

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee) {
    return this.http.post(`${this.baseUrl}/register`, employee, {
      responseType: 'text',
    });
  }

}
