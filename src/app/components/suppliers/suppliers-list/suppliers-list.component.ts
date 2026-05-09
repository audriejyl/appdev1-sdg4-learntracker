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

  showAddModal = false;
  newCourse: Partial<Supplier> = { supplierName: '', contactPerson: '' };

  showDeleteModal = false;
  courseToDelete: Supplier | null = null;

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

  // ── Add ──────────────────────────────────────
  openAddModal() {
    this.newCourse = { supplierName: '', contactPerson: '' };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addCourse() {
    if (!this.newCourse.supplierName?.trim()) return;

    this.supplierService.addSupplier({
      id: 0,
      supplierName: this.newCourse.supplierName.trim(),
      contactPerson: this.newCourse.contactPerson?.trim() ?? ''
    });

    this.suppliers = this.supplierService.getSuppliers();
    this.closeAddModal();
  }

  // ── Delete ────────────────────────────────────
  openDeleteModal(supplier: Supplier) {
    this.courseToDelete = supplier;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.courseToDelete = null;
  }

  deleteCourse() {
    if (!this.courseToDelete) return;

    this.supplierService.deleteSupplier(this.courseToDelete.id);
    this.suppliers = this.supplierService.getSuppliers();
    this.closeDeleteModal();
  }
}