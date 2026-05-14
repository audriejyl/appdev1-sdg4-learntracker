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

  email = '';
  password = '';

  registerEmail = '';
  registerPassword = '';

  isLoading = false;
  errorMsg = '';

  showRegister = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {

    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter email and password';
      return;
    }

    const success = this.authService.login(
      this.email,
      this.password
    );

    if (success) {

      localStorage.setItem('user', this.email);

      this.router.navigate(['/home']);

    } else {

      this.errorMsg = 'Invalid credentials';

    }
  }

  register() {

    this.errorMsg = '';

    if (!this.registerEmail || !this.registerPassword) {
      this.errorMsg = 'Please enter email and password';
      return;
    }

    const success = this.authService.register(
      this.registerEmail,
      this.registerPassword
    );

    if (success) {

      alert('Registration successful!');

      this.showRegister = false;

      this.email = this.registerEmail;
      this.password = this.registerPassword;

      this.registerEmail = '';
      this.registerPassword = '';

    } else {

      this.errorMsg =
        'Invalid email, weak password, or user already exists';

    }
  }
}