import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <label>Username:</label>
      <input [(ngModel)]="username" name="username" required />
      <br />
      <label>Password:</label>
      <input [(ngModel)]="password" name="password" type="password" required />
      <br />
      <button type="submit">Login</button>
      <p *ngIf="errorMsg" style="color:red">{{ errorMsg }}</p>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/suppliers']);
    } else {
      this.errorMsg = 'Invalid username or password';
    }
  }
}