import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = false;

  private user = {
    username: 'admin',
    password: 'admin123'
  };

  login(username: string, password: string): boolean {
    if (username === this.user.username && password === this.user.password) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}