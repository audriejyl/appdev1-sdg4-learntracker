import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Course, OpenLibraryBook } from '../models';

export type Supplier = Course;

/**
 * SupplierService
 * Now integrates with Open Library API to fetch real book data
 * Previously used hardcoded local data
 */
@Injectable({ providedIn: 'root' })
export class SupplierService {

  private readonly OPEN_LIBRARY_API = 'https://openlibrary.org/api';

  // Fallback local data for when API is unavailable
  private localSuppliers: Supplier[] = [
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

  private suppliersSubject = new BehaviorSubject<Supplier[]>(this.localSuppliers);
  suppliers$ = this.suppliersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadSuppliers();
  }

  /**
   * Fetch courses from Open Library API
   * Transforms API response to our Supplier format
   */
  private loadSuppliers(): void {
    this.getCoursesFromAPI().subscribe({
      next: (courses) => this.suppliersSubject.next(courses),
      error: () => this.suppliersSubject.next(this.localSuppliers)
    });
  }

  /**
   * Get courses from Open Library API
   * This replaces the hardcoded data
   */
  getCoursesFromAPI(): Observable<Supplier[]> {
    return this.http.get<{ docs: OpenLibraryBook[] }>(
      `${this.OPEN_LIBRARY_API}/search.json?q=programming&limit=10`
    ).pipe(
      map(response => 
        response.docs.map((book, index) => ({
          id: index + 1,
          supplierName: book.title,
          contactPerson: book.author_name?.[0] || 'Unknown Author'
        }))
      ),
      catchError(error => {
        console.error('Error fetching from Open Library:', error);
        return of(this.localSuppliers);
      })
    );
  }

  /**
   * Get all suppliers/courses
   * Returns from local cache
   */
  getSuppliers(): Supplier[] {
    return this.suppliersSubject.value;
  }

  /**
   * Get supplier by ID
   * Returns from local cache
   */
  getSupplierById(id: number): Supplier | undefined {
    return this.getSuppliers().find(s => s.id === id);
  }

  /**
   * Get suppliers as Observable with async pipe support
   * Returns loading state observable
   */
  getSuppliers$(): Observable<Supplier[]> {
    return this.suppliers$;
  }

  /**
   * Update a supplier
   * Note: Only updates local cache; doesn't persist to API
   */
  updateSupplier(updated: Supplier): void {
    const suppliers = this.suppliersSubject.value;
    const index = suppliers.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      suppliers[index] = { ...updated };
      this.suppliersSubject.next([...suppliers]);
    }
  }

  /**
   * Add a new supplier
   * Note: Only adds to local cache; doesn't persist to API
   */
  addSupplier(supplier: Supplier): void {
    const suppliers = this.suppliersSubject.value;
    const newId = suppliers.length > 0
      ? Math.max(...suppliers.map(s => s.id)) + 1
      : 1;
    const newSupplier = { ...supplier, id: newId };
    suppliers.push(newSupplier);
    this.suppliersSubject.next([...suppliers]);
  }

  /**
   * Delete a supplier
   * Note: Only deletes from local cache; doesn't affect API
   */
  deleteSupplier(id: number): void {
    const suppliers = this.suppliersSubject.value.filter(s => s.id !== id);
    this.suppliersSubject.next(suppliers);
  }
}