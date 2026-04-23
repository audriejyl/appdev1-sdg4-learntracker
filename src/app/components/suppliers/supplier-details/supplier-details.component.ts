import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Supplier, SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-supplier-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-details.component.html',
})
export class SupplierDetailsComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  supplier?: Supplier;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.supplier = this.supplierService.getSupplierById(id);
  }

  save() {
    if (this.supplier) {
      this.supplierService.updateSupplier(this.supplier);
    }
  }

  back() {
    this.router.navigate(['/suppliers']);
  }
}