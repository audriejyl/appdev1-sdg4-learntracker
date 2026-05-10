import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class HomeComponent {
  email           = '';
  password        = '';
  confirmPassword = '';
  isLoading       = false;
  errorMessage    = '';
  successMessage  = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.errorMessage   = '';
    this.successMessage = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const success = this.authService.register(this.email, this.password);
      this.isLoading = false;
      if (success) {
        this.successMessage = 'Account created! Redirecting to login…';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      } else {
        this.errorMessage = 'An account with this email already exists.';
      }
    }, 800);
  }
}