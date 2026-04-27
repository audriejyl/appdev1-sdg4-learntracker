import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email     = '';
  password  = '';
  isLoading = false;
  errorMsg  = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.errorMsg = '';
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter your email and password.';
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/suppliers']);
      } else {
        this.errorMsg = 'Invalid email or password. Please try again.';
      }
    }, 800);
  }
}