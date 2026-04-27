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
  styleUrls: ['./supplier-details.component.css'],
})
export class SupplierDetailsComponent {

  private route           = inject(ActivatedRoute);
  private router          = inject(Router);
  private supplierService = inject(SupplierService);

  supplier?: Supplier;
  saveSuccess = false;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.supplier = this.supplierService.getSupplierById(id);
  }

  save() {
    if (this.supplier) {
      this.supplierService.updateSupplier(this.supplier);
      this.saveSuccess = true;
      setTimeout(() => (this.saveSuccess = false), 3000);
    }
  }

  back() {
    this.router.navigate(['/suppliers']);
  }
}