// us013.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Consumer {
  id: number;
  name: string;
  section: string;
  type: string;
}

@Component({
  selector: 'app-us013',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './us013.component.html',
  styleUrls: ['./us013.component.css']
})
export class Us013Component {
  // Consumer data
  private allConsumers: Consumer[] = [
    { id: 1719234567890, name: "John Doe", section: "Office", type: "Residential" },
    { id: 1719235678901, name: "Jane Smith", section: "Region", type: "Commercial" },
    { id: 1719236789012, name: "ABC Corp", section: "Office", type: "Commercial" },
    { id: 1719237890123, name: "Mike Johnson", section: "Region", type: "Residential" },
    { id: 1719238901234, name: "XYZ Ltd", section: "Office", type: "Commercial" },
    { id: 1719239012345, name: "Sarah Lee", section: "Region", type: "Residential" },
    { id: 1719234567891, name: "John Smith", section: "Office", type: "Residential" },
    { id: 1719235678909, name: "Jane Doe", section: "Region", type: "Commercial" },
    { id: 1719236789017, name: "ABC Ltd", section: "Office", type: "Commercial" },
    { id: 1719237890124, name: "Mike Lee", section: "Region", type: "Residential" },
    { id: 1719238901232, name: "XYZ Corp", section: "Office", type: "Commercial" },
    { id: 1719239012341, name: "Sarah Johnson", section: "Region", type: "Residential" }
  ];

  // State
  filteredConsumers: Consumer[] = [...this.allConsumers];
  rowsPerPage: number = 5;
  currentPage: number = 1;
  sectionFilter: string = '';
  typeFilter: string = '';

  // Filter handler
  filterConsumers(): void {
    this.filteredConsumers = this.allConsumers.filter(consumer => {
      const matchesSection = this.sectionFilter === '' || consumer.section === this.sectionFilter;
      const matchesType = this.typeFilter === '' || consumer.type === this.typeFilter;
      return matchesSection && matchesType;
    });
    this.currentPage = 1; // Reset to first page
  }

  // Pagination handlers
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  // Getters
  get displayedConsumers(): Consumer[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredConsumers.slice(start, end);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredConsumers.length / this.rowsPerPage) || 1;
  }

  canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  canGoNext(): boolean {
    return this.currentPage < this.getTotalPages();
  }
}