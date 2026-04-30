import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent {

  suppliers: Supplier[] = [];
  searchTerm: string = '';

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.suppliers = this.supplierService.getSuppliers();
  }

  viewSupplierDetails(id: number) {
    this.router.navigate(['/suppliers', id]);
  }

  get filteredSuppliers() {
    return this.suppliers.filter(s =>
      s.supplierName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
