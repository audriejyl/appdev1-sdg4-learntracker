import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService, Supplier } from '../../services/supplier.service';

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
  scheduledDate: string;
  tag: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  suppliers: Supplier[] = [];
  today = new Date();
  greeting = '';
  newTodo = '';
  showAnnouncementForm = false;
  newAnnouncement: Partial<Announcement> = { title: '', body: '', tag: 'General', scheduledDate: '' };

  todos: TodoItem[] = [
    { id: 1, text: 'Review Introduction to Programming materials', done: false },
    { id: 2, text: 'Submit grades for Data Structures', done: true },
    { id: 3, text: 'Prepare quiz for Operating Systems', done: false },
  ];

  announcements: Announcement[] = [
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
  ];

  tags = ['General', 'Exam', 'Holiday', 'Reminder', 'Activity'];

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

  setGreeting() {
    const hour = this.today.getHours();
    if (hour < 12)      this.greeting = 'Good morning';
    else if (hour < 17) this.greeting = 'Good afternoon';
    else                this.greeting = 'Good evening';
  }

  get totalCourses(): number { return this.suppliers.length; }
  get completedTodos(): number { return this.todos.filter(t => t.done).length; }
  get pendingTodos(): number { return this.todos.filter(t => !t.done).length; }

  get formattedDate(): string {
    return this.today.toLocaleDateString('en-PH', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  viewCourse(id: number) {
    this.router.navigate(['/suppliers', id]);
  }

  // ── To-Do ─────────────────────────────────────
  addTodo() {
    if (!this.newTodo.trim()) return;
    this.todos.push({
      id: Date.now(),
      text: this.newTodo.trim(),
      done: false
    });
    this.newTodo = '';
  }

  toggleTodo(todo: TodoItem) {
    todo.done = !todo.done;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  // ── Announcements ─────────────────────────────
  openAnnouncementForm() {
    this.newAnnouncement = { title: '', body: '', tag: 'General', scheduledDate: '' };
    this.showAnnouncementForm = true;
  }

  closeAnnouncementForm() {
    this.showAnnouncementForm = false;
  }

  formatScheduledDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  postAnnouncement() {
    if (!this.newAnnouncement.title?.trim() || !this.newAnnouncement.body?.trim()) return;
    this.announcements.unshift({
      id: Date.now(),
      title: this.newAnnouncement.title.trim(),
      body: this.newAnnouncement.body.trim(),
      tag: this.newAnnouncement.tag ?? 'General',
      date: new Date().toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }),
      scheduledDate: this.formatScheduledDate(this.newAnnouncement.scheduledDate ?? '')
    });
    this.closeAnnouncementForm();
  }

  deleteAnnouncement(id: number) {
    this.announcements = this.announcements.filter(a => a.id !== id);
  }

  getTagColor(tag: string): string {
    const map: Record<string, string> = {
      'Exam':     'tag-exam',
      'Holiday':  'tag-holiday',
      'Reminder': 'tag-reminder',
      'Activity': 'tag-activity',
      'General':  'tag-general',
    };
    return map[tag] ?? 'tag-general';
  }
}