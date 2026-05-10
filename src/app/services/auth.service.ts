import { Injectable } from '@angular/core';

export interface UserAccount {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = false;

  private accounts: UserAccount[] = [
    { email: 'admin', password: 'admin123' }
  ];

  /**
   * Validates email format.
   * @param email - Email string to validate
   * @returns true if email is valid, false otherwise
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates password strength.
   * @param password - Password string to validate
   * @returns true if password meets minimum requirements, false otherwise
   */
  private isStrongPassword(password: string): boolean {
    return !!password && password.length >= 6;
  }

  register(email: string, password: string): boolean {
    // Validate inputs
    if (!email || !password) return false;
    if (!this.isValidEmail(email)) return false;
    if (!this.isStrongPassword(password)) return false;

    const exists = this.accounts.some(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    this.accounts.push({ email, password });
    return true;
  }

  login(email: string, password: string): boolean {
    if (!email || !password) return false;

    const match = this.accounts.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (match) { this.loggedIn = true; return true; }
    return false;
  }

  logout() { this.loggedIn = false; }
  isLoggedIn(): boolean { return this.loggedIn; }
}