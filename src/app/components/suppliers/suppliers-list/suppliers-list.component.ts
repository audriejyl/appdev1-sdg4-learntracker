import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Supplier, SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Suppliers</h2>

    <table class="suppliers-table" aria-label="Suppliers table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Supplier Name</th>
          <th>Contact Person</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let supplier of suppliers">
          <td>{{ supplier.id }}</td>
          <td>{{ supplier.supplierName }}</td>
          <td>{{ supplier.contactPerson }}</td>
          <td>
            <button type="button" (click)="viewSupplierDetails(supplier.id)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      .suppliers-table {
        width: 100%;
        border-collapse: collapse;
      }
      .suppliers-table th,
      .suppliers-table td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      .suppliers-table th {
        text-align: left;
      }
    `,
  ],
})
export class SuppliersListComponent {
  private readonly supplierService = inject(SupplierService);
  private readonly router = inject(Router);

  suppliers: Supplier[] = this.supplierService.getSuppliers();

  viewSupplierDetails(id: number): void {
    this.router.navigate(['/suppliers', id]);
  }
}

