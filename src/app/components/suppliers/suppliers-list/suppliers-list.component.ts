import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupplierService, Supplier } from '../../../services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suppliers-list.component.html'
})
export class SuppliersListComponent {

  suppliers: Supplier[] = [];

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
}