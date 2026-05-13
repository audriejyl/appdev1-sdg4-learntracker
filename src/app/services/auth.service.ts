import { Injectable } from '@angular/core';

export interface UserAccount {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accounts: UserAccount[] = [
    { email: 'admin', password: 'admin123' }
  ];

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  private isStrongPassword(password: string): boolean {
    return !!password && password.length >= 6;
  }

  /**
   * Register new user
   */
  register(email: string, password: string): boolean {
    if (!email || !password) return false;
    if (!this.isValidEmail(email)) return false;
    if (!this.isStrongPassword(password)) return false;

    const exists = this.accounts.some(
      a => a.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) return false;

    this.accounts.push({ email, password });
    return true;
  }

  /**
   * Login user
   */
  login(email: string, password: string): boolean {
    if (!email || !password) return false;

    const match = this.accounts.find(
      a =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    );

    if (match) {
      localStorage.setItem('token', email); // ✅ store session
      return true;
    }

    return false;
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token'); // ✅ clear session
    localStorage.removeItem('user');
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}