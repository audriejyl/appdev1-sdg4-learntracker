import { Injectable } from '@angular/core';

export type Supplier = {
  id: number;
  supplierName: string;
  contactPerson: string;
};

@Injectable({ providedIn: 'root' })
export class SupplierService {

  private suppliers: Supplier[] = [
    { id: 1, supplierName: 'BrightPath Learning Supplies', contactPerson: 'Ava Chen' },
    { id: 2, supplierName: 'EduWorks Stationery Co.', contactPerson: 'Noah Patel' },
    { id: 3, supplierName: 'FutureSkills Books & More', contactPerson: 'Mia Santos' },
    { id: 4, supplierName: 'Classroom Corner', contactPerson: 'Ethan Brooks' },
    { id: 5, supplierName: 'STEM Starter Kits', contactPerson: 'Sophia Nguyen' },
    { id: 6, supplierName: 'ReadAhead Distributors', contactPerson: 'Liam Johnson' },
    { id: 7, supplierName: 'Inclusive Learning Tools', contactPerson: 'Isabella Rivera' },
    { id: 8, supplierName: 'SchoolTech Essentials', contactPerson: 'Lucas Martin' },
    { id: 9, supplierName: 'GreenClass Supplies', contactPerson: 'Amelia Davis' },
    { id: 10, supplierName: 'TeacherFirst Resources', contactPerson: 'Oliver King' },
  ];

  getSuppliers(): Supplier[] {
    return this.suppliers;
  }

  getSupplierById(id: number): Supplier | undefined {
    return this.suppliers.find(s => s.id === id);
  }

  updateSupplier(updated: Supplier): void {
    const index = this.suppliers.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      this.suppliers[index] = updated;
    }
  }
}