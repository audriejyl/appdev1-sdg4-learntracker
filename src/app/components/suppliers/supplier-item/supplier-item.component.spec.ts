import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplierItemComponent } from './supplier-item.component';
import { Supplier } from '../../../services/supplier.service';

describe('SupplierItemComponent', () => {
  let component: SupplierItemComponent;
  let fixture: ComponentFixture<SupplierItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display supplier name from @Input', () => {
    const mockSupplier: Supplier = {
      id: 1,
      supplierName: 'Programming 101',
      contactPerson: 'Dr. John Doe'
    };
    component.supplier = mockSupplier;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.supplier-name').textContent).toContain('Programming 101');
  });

  it('should emit viewDetails event when view button clicked', (done) => {
    const mockSupplier: Supplier = {
      id: 5,
      supplierName: 'Test Course',
      contactPerson: 'Instructor'
    };
    component.supplier = mockSupplier;
    
    component.viewDetails.subscribe((id: number) => {
      expect(id).toBe(5);
      done();
    });

    component.onViewDetails();
  });

  it('should emit deleteSupplier event with correct id', (done) => {
    const mockSupplier: Supplier = {
      id: 3,
      supplierName: 'To Delete',
      contactPerson: 'Test'
    };
    component.supplier = mockSupplier;
    
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.deleteSupplier.subscribe((id: number) => {
      expect(id).toBe(3);
      done();
    });

    component.onDelete();
  });

  it('should not emit delete event if user cancels confirm dialog', () => {
    const mockSupplier: Supplier = {
      id: 2,
      supplierName: 'Keep This',
      contactPerson: 'Test'
    };
    component.supplier = mockSupplier;
    
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(component.deleteSupplier, 'emit');
    
    component.onDelete();
    expect(component.deleteSupplier.emit).not.toHaveBeenCalled();
  });

  it('should display contact person from @Input', () => {
    const mockSupplier: Supplier = {
      id: 1,
      supplierName: 'Course',
      contactPerson: 'Prof. Jane Smith'
    };
    component.supplier = mockSupplier;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Prof. Jane Smith');
  });
});
