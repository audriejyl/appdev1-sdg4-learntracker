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

  register(email: string, password: string): boolean {
    const exists = this.accounts.some(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    this.accounts.push({ email, password });
    return true;
  }

  login(email: string, password: string): boolean {
    const match = this.accounts.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (match) { this.loggedIn = true; return true; }
    return false;
  }

  logout() { this.loggedIn = false; }
  isLoggedIn(): boolean { return this.loggedIn; }
}