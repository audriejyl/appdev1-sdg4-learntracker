import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuppliersListComponent } from './suppliers-list.component';
import { SupplierService } from '../../../services/supplier.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SuppliersListComponent', () => {
  let component: SuppliersListComponent;
  let fixture: ComponentFixture<SuppliersListComponent>;
  let mockSupplierService: jasmine.SpyObj<SupplierService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockSuppliers = [
    { id: 1, supplierName: 'Programming 101', contactPerson: 'Dr. John Doe' },
    { id: 2, supplierName: 'Data Structures', contactPerson: 'Prof. Jane Smith' },
    { id: 3, supplierName: 'Web Development', contactPerson: 'Mr. Bob Johnson' },
  ];

  beforeEach(async () => {
    mockSupplierService = jasmine.createSpyObj('SupplierService', [
      'getSuppliers',
      'getSuppliers$',
      'addSupplier',
      'deleteSupplier',
      'updateSupplier'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockSupplierService.getSuppliers.and.returnValue(mockSuppliers);
    mockSupplierService.getSuppliers$.and.returnValue(of(mockSuppliers));

    await TestBed.configureTestingModule({
      imports: [SuppliersListComponent],
      providers: [
        { provide: SupplierService, useValue: mockSupplierService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load suppliers on init', () => {
    fixture.detectChanges();
    expect(mockSupplierService.getSuppliers).toHaveBeenCalled();
    expect(component.suppliers.length).toBe(3);
    expect(component.suppliers[0].supplierName).toBe('Programming 101');
  });

  it('should filter suppliers by search term', () => {
    component.suppliers = mockSuppliers;
    component.searchTerm = 'data';
    const filtered = component.filteredSuppliers;
    expect(filtered.length).toBe(1);
    expect(filtered[0].supplierName).toBe('Data Structures');
  });

  it('should perform case-insensitive search', () => {
    component.suppliers = mockSuppliers;
    component.searchTerm = 'WEB';
    const filtered = component.filteredSuppliers;
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe(3);
  });

  it('should return all suppliers when search term is empty', () => {
    component.suppliers = mockSuppliers;
    component.searchTerm = '';
    expect(component.filteredSuppliers.length).toBe(3);
  });

  it('should navigate to supplier details when onViewDetails called', () => {
    component.onViewDetails(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/suppliers', 1]);
  });

  it('should open add modal', () => {
    component.openAddModal();
    expect(component.showAddModal).toBe(true);
    expect(component.newCourse.supplierName).toBe('');
    expect(component.newCourse.contactPerson).toBe('');
  });

  it('should close add modal', () => {
    component.showAddModal = true;
    component.closeAddModal();
    expect(component.showAddModal).toBe(false);
  });

  it('should add a new course with valid data', () => {
    component.suppliers = mockSuppliers.slice();
    component.newCourse = {
      supplierName: 'New Course',
      contactPerson: 'Instructor Name'
    };
    component.addCourse();

    expect(mockSupplierService.addSupplier).toHaveBeenCalledWith({
      id: 0,
      supplierName: 'New Course',
      contactPerson: 'Instructor Name'
    });
  });

  it('should not add course with empty supplier name', () => {
    component.newCourse = { supplierName: '', contactPerson: 'Name' };
    component.addCourse();
    expect(mockSupplierService.addSupplier).not.toHaveBeenCalled();
  });

  it('should delete supplier when confirmed', () => {
    const supplierToDelete = mockSuppliers[0];
    component.suppliers = mockSuppliers.slice();
    component.courseToDelete = supplierToDelete;
    component.showDeleteModal = true;

    component.deleteCourse();

    expect(mockSupplierService.deleteSupplier).toHaveBeenCalledWith(supplierToDelete.id);
  });

  it('should delete supplier from list via onDeleteSupplier', () => {
    component.suppliers = mockSuppliers.slice();
    mockSupplierService.getSuppliers.and.returnValue(
      mockSuppliers.filter(s => s.id !== 2)
    );

    component.onDeleteSupplier(2);

    expect(mockSupplierService.deleteSupplier).toHaveBeenCalledWith(2);
  });

  it('should open delete confirmation modal', () => {
    const supplier = mockSuppliers[0];
    component.openDeleteModal(supplier);

    expect(component.showDeleteModal).toBe(true);
    expect(component.courseToDelete).toBe(supplier);
  });

  it('should close delete modal and clear selection', () => {
    component.courseToDelete = mockSuppliers[0];
    component.showDeleteModal = true;

    component.closeDeleteModal();

    expect(component.showDeleteModal).toBe(false);
    expect(component.courseToDelete).toBeNull();
  });
});
