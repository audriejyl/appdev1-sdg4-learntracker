import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { SupplierService } from '../../services/supplier.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockSupplierService: jasmine.SpyObj<SupplierService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockSuppliers = [
    { id: 1, supplierName: 'Course 1', contactPerson: 'Instructor 1' },
    { id: 2, supplierName: 'Course 2', contactPerson: 'Instructor 2' },
  ];

  beforeEach(async () => {
    mockSupplierService = jasmine.createSpyObj('SupplierService', [
      'getSuppliers',
      'getSuppliers$'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockSupplierService.getSuppliers.and.returnValue(mockSuppliers);
    mockSupplierService.getSuppliers$.and.returnValue(of(mockSuppliers));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: SupplierService, useValue: mockSupplierService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default todos and announcements', () => {
    expect(component.todos.length).toBeGreaterThan(0);
    expect(component.announcements.length).toBeGreaterThan(0);
  });

  it('should load suppliers on init', () => {
    fixture.detectChanges();
    expect(mockSupplierService.getSuppliers$).toHaveBeenCalled();
  });

  it('should set greeting based on current hour', () => {
    component.setGreeting();
    expect(component.greeting).toBeTruthy();
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(component.greeting);
  });

  it('should compute completedTodos correctly', () => {
    expect(component.completedTodos()).toBe(1); // One todo is done: false by default
  });

  it('should compute pendingTodos correctly', () => {
    expect(component.pendingTodos()).toBe(2); // Two todos pending
  });

  it('should add a new todo to the signals', () => {
    component.newTodo = 'New test task';
    component.addTodo();

    expect(component.todos.length).toBe(4);
    expect(component.todos[component.todos.length - 1].text).toBe('New test task');
    expect(component.todos[component.todos.length - 1].done).toBe(false);
  });

  it('should not add empty todo', () => {
    const initialCount = component.todos.length;
    component.newTodo = '   ';
    component.addTodo();

    expect(component.todos.length).toBe(initialCount);
  });

  it('should toggle todo completion status', () => {
    const todo = component.todos[0];
    const initialStatus = todo.done;
    component.toggleTodo(todo);

    expect(component.todos[0].done).toBe(!initialStatus);
  });

  it('should delete todo by id', () => {
    const initialCount = component.todos.length;
    const todoToDelete = component.todos[0];
    component.deleteTodo(todoToDelete.id);

    expect(component.todos.length).toBe(initialCount - 1);
    expect(component.todos.some(t => t.id === todoToDelete.id)).toBe(false);
  });

  it('should add announcement', () => {
    const initialCount = component.announcements.length;
    component.newAnnouncement = {
      title: 'Test Announcement',
      body: 'This is a test',
      tag: 'General',
      scheduledDate: '2026-06-15'
    };

    component.postAnnouncement();

    expect(component.announcements.length).toBe(initialCount + 1);
    expect(component.announcements[0].title).toBe('Test Announcement');
  });

  it('should not add announcement with empty title', () => {
    const initialCount = component.announcements.length;
    component.newAnnouncement = {
      title: '',
      body: 'Test body',
      tag: 'General'
    };

    component.postAnnouncement();

    expect(component.announcements.length).toBe(initialCount);
  });

  it('should delete announcement by id', () => {
    const initialCount = component.announcements.length;
    const announcementId = component.announcements[0].id;

    component.deleteAnnouncement(announcementId);

    expect(component.announcements.length).toBe(initialCount - 1);
    expect(component.announcements.some(a => a.id === announcementId)).toBe(false);
  });

  it('should open announcement form and reset fields', () => {
    component.openAnnouncementForm();

    expect(component.showAnnouncementForm).toBe(true);
    expect(component.newAnnouncement.title).toBe('');
    expect(component.newAnnouncement.body).toBe('');
  });

  it('should close announcement form', () => {
    component.showAnnouncementForm = true;
    component.closeAnnouncementForm();

    expect(component.showAnnouncementForm).toBe(false);
  });

  it('should return correct tag color class', () => {
    expect(component.getTagColor('Exam')).toBe('tag-exam');
    expect(component.getTagColor('Holiday')).toBe('tag-holiday');
    expect(component.getTagColor('Unknown')).toBe('tag-general');
  });

  // Test CanDeactivate implementation
  it('should allow deactivation when there are no unsaved changes', () => {
    const canLeave = component.canDeactivate();
    expect(canLeave).toBe(true);
  });

  it('should prompt user when there are unsaved changes', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component['hasUnsavedChanges'].set(true);

    const canLeave = component.canDeactivate();

    expect(window.confirm).toHaveBeenCalled();
    expect(canLeave).toBe(true);
  });

  it('should prevent deactivation if user cancels unsaved changes prompt', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component['hasUnsavedChanges'].set(true);

    const canLeave = component.canDeactivate();

    expect(canLeave).toBe(false);
  });

  it('should view course details', () => {
    component.viewCourse(5);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/suppliers', 5]);
  });

  it('should format scheduled date correctly', () => {
    const formatted = component.formatScheduledDate('2026-06-15');
    expect(formatted).toContain('Jun') || expect(formatted).toContain('15') || expect(formatted).toContain('2026');
  });
});

