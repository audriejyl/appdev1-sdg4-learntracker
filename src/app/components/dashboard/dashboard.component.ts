import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService, Supplier } from '../../services/supplier.service';
import { CanComponentDeactivate } from '../../guards/can-deactivate.guard';
import { TodoItem, Announcement } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, CanComponentDeactivate {

  // Angular Signals for reactive state management
  private todosSignal = signal<TodoItem[]>([
    { id: 1, text: 'Review Introduction to Programming materials', done: false },
    { id: 2, text: 'Submit grades for Data Structures', done: true },
    { id: 3, text: 'Prepare quiz for Operating Systems', done: false },
  ]);

  private announcementsSignal = signal<Announcement[]>([
    {
      id: 1,
      title: 'Midterm Exam Schedule Released',
      body: 'Midterm exams will be held from June 10–14. Please review the full schedule on the bulletin board.',
      date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
      scheduledDate: 'Jun 10, 2026',
      tag: 'Exam'
    },
    {
      id: 2,
      title: 'No Classes on June 12',
      body: 'In observance of Independence Day, there will be no classes on June 12.',
      date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
      scheduledDate: 'Jun 12, 2026',
      tag: 'Holiday'
    },
  ]);

  private hasUnsavedChanges = signal(false);
  private newTodoSignal = signal('');
  private showAnnouncementFormSignal = signal(false);

  // Computed signals derive values from other signals
  completedTodos = computed(() => 
    this.todosSignal().filter(t => t.done).length
  );

  pendingTodos = computed(() => 
    this.todosSignal().filter(t => !t.done).length
  );

  suppliers: Supplier[] = [];
  today = new Date();
  greeting = '';
  newAnnouncement: Partial<Announcement> = { title: '', body: '', tag: 'General', scheduledDate: '' };
  tags = ['General', 'Exam', 'Holiday', 'Reminder', 'Activity'];

  // Expose signals to template
  get todos() {
    return this.todosSignal();
  }

  get announcements() {
    return this.announcementsSignal();
  }

  get totalCourses() {
    return this.suppliers.length;
  }

  get newTodo() {
    return this.newTodoSignal();
  }

  set newTodo(value: string) {
    this.newTodoSignal.set(value);
  }

  get showAnnouncementForm() {
    return this.showAnnouncementFormSignal();
  }

  set showAnnouncementForm(value: boolean) {
    this.showAnnouncementFormSignal.set(value);
  }

  constructor(
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.supplierService.suppliers$.subscribe(data => {
      this.suppliers = data;
    });
    this.setGreeting();
  }

  setGreeting(): void {
    const hour = this.today.getHours();
    if (hour < 12) this.greeting = 'Good morning';
    else if (hour < 17) this.greeting = 'Good afternoon';
    else this.greeting = 'Good evening';
  }

  get formattedDate(): string {
    return this.today.toLocaleDateString('en-PH', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  viewCourse(id: number): void {
    this.router.navigate(['/suppliers', id]);
  }

  // ── To-Do ─────────────────────────────────────
  addTodo(): void {
    if (!this.newTodo.trim()) return;
    const todos = this.todosSignal();
    this.todosSignal.set([
      ...todos,
      {
        id: Date.now(),
        text: this.newTodo.trim(),
        done: false
      }
    ]);
    this.newTodoSignal.set('');
    this.hasUnsavedChanges.set(true);
  }

  toggleTodo(todo: TodoItem): void {
    const todos = this.todosSignal();
    const updated = todos.map(t =>
      t.id === todo.id ? { ...t, done: !t.done } : t
    );
    this.todosSignal.set(updated);
    this.hasUnsavedChanges.set(true);
  }

  deleteTodo(id: number): void {
    const todos = this.todosSignal().filter(t => t.id !== id);
    this.todosSignal.set(todos);
    this.hasUnsavedChanges.set(true);
  }

  // ── Announcements ─────────────────────────────
  openAnnouncementForm(): void {
    this.newAnnouncement = { title: '', body: '', tag: 'General', scheduledDate: '' };
    this.showAnnouncementFormSignal.set(true);
  }

  closeAnnouncementForm(): void {
    this.showAnnouncementFormSignal.set(false);
  }

  formatScheduledDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  postAnnouncement(): void {
    if (!this.newAnnouncement.title?.trim() || !this.newAnnouncement.body?.trim()) return;
    const announcements = this.announcementsSignal();
    this.announcementsSignal.set([
      {
        id: Date.now(),
        title: this.newAnnouncement.title.trim(),
        body: this.newAnnouncement.body.trim(),
        tag: this.newAnnouncement.tag ?? 'General',
        date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
        scheduledDate: this.formatScheduledDate(this.newAnnouncement.scheduledDate ?? '')
      },
      ...announcements
    ]);
    this.closeAnnouncementForm();
    this.hasUnsavedChanges.set(true);
  }

  deleteAnnouncement(id: number): void {
    const announcements = this.announcementsSignal().filter(a => a.id !== id);
    this.announcementsSignal.set(announcements);
    this.hasUnsavedChanges.set(true);
  }

  getTagColor(tag: string): string {
    const map: Record<string, string> = {
      'Exam': 'tag-exam',
      'Holiday': 'tag-holiday',
      'Reminder': 'tag-reminder',
      'Activity': 'tag-activity',
      'General': 'tag-general',
    };
    return map[tag] ?? 'tag-general';
  }

  /**
   * CanDeactivate implementation
   * Prompts user if there are unsaved changes when leaving the component
   */
  canDeactivate(): boolean {
    if (this.hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Do you want to leave?');
    }
    return true;
  }
}