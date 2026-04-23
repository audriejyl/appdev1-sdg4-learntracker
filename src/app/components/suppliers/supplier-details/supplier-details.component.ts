import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Supplier, SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Supplier Details</h2>

    <ng-container *ngIf="supplier; else notFound">
      <p><strong>ID:</strong> {{ supplier.id }}</p>
      <p><strong>Supplier Name:</strong> {{ supplier.supplierName }}</p>
      <p><strong>Contact Person:</strong> {{ supplier.contactPerson }}</p>
    </ng-container>

    <ng-template #notFound>
      <p>Supplier not found.</p>
    </ng-template>

    <p>
      <a routerLink="/suppliers">Back to suppliers</a>
    </p>
  `,
})
export class SupplierDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly supplierService = inject(SupplierService);

  supplier?: Supplier;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    this.supplier = Number.isFinite(id) ? this.supplierService.getSupplierById(id) : undefined;
  }
}

