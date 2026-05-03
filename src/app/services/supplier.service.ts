import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Supplier = {
  id: number;
  supplierName: string;
  contactPerson: string;
};

@Injectable({ providedIn: 'root' })
export class SupplierService {

  private suppliers: Supplier[] = [
  { id: 1, supplierName: 'Introduction to Programming', contactPerson: 'Instructor: John Cruz' },
  { id: 2, supplierName: 'Introduction to Application Development', contactPerson: 'Instructor: Maria Santos' },
  { id: 3, supplierName: 'Wireless and Mobile Computing', contactPerson: 'Instructor: Daniel Reyes' },
  { id: 4, supplierName: 'Scaling Networks', contactPerson: 'Instructor: Angela Lopez' },
  { id: 5, supplierName: 'System Integration and Architecture', contactPerson: 'Instructor: Mark Dela Cruz' },
  { id: 6, supplierName: 'Information Management and Database Systems', contactPerson: 'Instructor: Carla Mendoza' },
  { id: 7, supplierName: 'Human Computer Interaction', contactPerson: 'Instructor: Leo Ramos' },
  { id: 8, supplierName: 'Data Structures and Algorithm', contactPerson: 'Instructor: Nina Castillo' },
  { id: 9, supplierName: 'Operating System', contactPerson: 'Instructor: Kevin Tan' },
  { id: 10, supplierName: 'Server Administration', contactPerson: 'Instructor: Sofia Garcia' },
];

  private suppliersSubject = new BehaviorSubject<Supplier[]>(this.suppliers);
  suppliers$ = this.suppliersSubject.asObservable();

  getSuppliers(): Supplier[] {
    return this.suppliers;
  }

  getSupplierById(id: number): Supplier | undefined {
    return this.suppliers.find(s => s.id === id);
  }

  updateSupplier(updated: Supplier): void {
    const index = this.suppliers.findIndex(s => s.id === updated.id);

    if (index !== -1) {
      this.suppliers[index] = { ...updated };

      this.suppliersSubject.next([...this.suppliers]);
    }
  }
}