import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customer-module';
  customers: Customer[] = [];
  customerToUpdate: Customer = { id: 0, name: '', email: '', phoneNumber: '' };

  constructor(private customerService: CustomerService) {
    this.getCustomerDetails();
  }

  register(registerForm: NgForm) {
    this.customerService.registerCustomer(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.getCustomerDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCustomerDetails() {
    this.customerService.getCustomers().subscribe(
      (resp) => {
        this.customers = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCustomer(customer: Customer) {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.id).subscribe(
        () => {
          this.getCustomerDetails();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  openEditModal(customer: Customer) {
    this.customerToUpdate = { ...customer }; // Copy the customer details
    $('#editModal').modal('show'); // Show the modal
  }

  closeEditModal() {
    $('#editModal').modal('hide'); // Hide the modal
  }

  updateCustomer(form: NgForm) {
    if (form.valid) {
      this.customerService.updateCustomer(this.customerToUpdate).subscribe(
        () => {
          this.getCustomerDetails();
          this.closeEditModal(); // Use the close method here
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
