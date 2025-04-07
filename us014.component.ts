import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Consumer {
  customerId: string;
  consumerNumber: string;
  fullName: string;
  address: string;
  contactInfo: string;
  customerType: 'Individual' | 'Business';
}

@Component({
  selector: 'app-us014',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './us014.component.html',
  styleUrls: ['./us014.component.css'],
})
export class US014Component {
  searchTerm: string = '';
  filteredConsumers: Consumer[] = [];
  noResults: boolean = false;
  dropdowns: { [key: string]: boolean } = {};
  statusMessage: string = '';
  showUpdateForm: boolean = false;
  selectedConsumer: Consumer = {
    customerId: '',
    consumerNumber: '',
    fullName: '',
    address: '',
    contactInfo: '',
    customerType: 'Individual',
  };
  message: string = '';

  // Mock data with 13-digit consumerNumber
  consumers: Consumer[] = [
    {
      customerId: 'CUST123',
      consumerNumber: '1234567890123', // 13 digits
      fullName: 'John Doe',
      address: '123 Main St, City',
      contactInfo: 'john.doe@example.com',
      customerType: 'Individual',
    },
    {
      customerId: 'CUST124',
      consumerNumber: '9876543210987', // 13 digits
      fullName: 'Jane Smith',
      address: '456 Oak Ave, Town',
      contactInfo: 'jane.smith@example.com',
      customerType: 'Business',
    },
  ];

  searchConsumer() {
    console.log('Searching for:', this.searchTerm);
    this.filteredConsumers = this.consumers.filter(consumer =>
      consumer.customerId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      consumer.consumerNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      consumer.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noResults = this.filteredConsumers.length === 0;
    console.log('Filtered consumers:', this.filteredConsumers);
    this.statusMessage = ''; // Clear status message on new search
  }

  toggleDropdown(customerId: string) {
    console.log('Toggling dropdown for:', customerId);
    this.dropdowns[customerId] = !this.dropdowns[customerId] || false;
  }

  goToUpdate(customerId: string) {
    console.log('Going to update for:', customerId);
    const consumer = this.consumers.find(c => c.customerId === customerId);
    if (consumer) {
      this.selectedConsumer = { ...consumer };
      this.showUpdateForm = true;
      this.dropdowns[customerId] = false; // Close dropdown
      console.log('Selected consumer:', this.selectedConsumer);
    } else {
      console.error('Consumer not found:', customerId);
    }
  }

  updateStatus(customerId: string, status: string) {
    console.log('Updating status for:', customerId, 'to:', status);
    this.statusMessage = `Consumer status is updated to ${status}.`;
    this.dropdowns[customerId] = false; // Close dropdown
  }

  updateConsumer() {
    console.log('Updating consumer:', this.selectedConsumer);
    // Validate Full Name
    if (this.selectedConsumer.fullName.length < 3 || this.selectedConsumer.fullName.length > 50) {
      this.message = 'Full Name must be between 3 and 50 characters.';
      return;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(this.selectedConsumer.fullName)) {
      this.message = 'Full Name must contain only letters and spaces.';
      return;
    }
    if (this.selectedConsumer.fullName.split(' ').filter(word => word.length > 0).length < 2) {
      this.message = 'Full Name must include at least a first and last name.';
      return;
    }

    // Validate Address
    if (!this.selectedConsumer.address) {
      this.message = 'Address cannot be empty.';
      return;
    }
    if (this.selectedConsumer.address.length < 5 || this.selectedConsumer.address.length > 255) {
      this.message = 'Address must be between 5 and 255 characters.';
      return;
    }

    // Validate Contact Info (email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.selectedConsumer.contactInfo)) {
      this.message = 'Please enter a valid email address.';
      return;
    }

    // Validate Consumer Number (must be exactly 13 digits)
    const consumerNumberRegex = /^\d{13}$/;
    if (!consumerNumberRegex.test(this.selectedConsumer.consumerNumber)) {
      this.message = 'Consumer Number must be exactly 13 digits.';
      return;
    }

    // Simulate successful update
    setTimeout(() => {
      this.message = 'Consumer details updated successfully!';
      this.showUpdateForm = false; // Hide form after success
      console.log('Update successful');
    }, 500);
  }

  goBack() {
    console.log('Going back');
    this.showUpdateForm = false;
    this.message = '';
  }
}