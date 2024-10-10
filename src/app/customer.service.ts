import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API = "http://localhost:8080/customerservice"; // Adjust the URL if needed

  constructor(private http: HttpClient) { }

  public registerCustomer(customerData: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API, customerData);
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API);
  }

  public deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${customerId}`);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.API}/${customer.id}`, customer);
  }

  public getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API}/${id}`);
  }
}
