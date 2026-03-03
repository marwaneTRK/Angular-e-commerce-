import { Injectable } from '@angular/core';

const STORAGE_USERS = 'mock_users_db';
const STORAGE_TOKEN = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor() {
    this.initializeUsers();
  }

  private getUsers(): any[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    } catch {
      return [];
    }
  }

  private saveUsers(users: any[]) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }

  initializeUsers() {
    const users = this.getUsers();

    if (!users.find(u => u.email === 'admin@ecom.local')) {
      users.push({
        id: 'admin_001',
        name: 'Administrator',
        email: 'admin@ecom.local',
        password: 'admin123',
        role: 'admin',
        activated: true
      });
    }

    if (!users.find(u => u.email === 'hamza@ecom.local')) {
      users.push({
        id: 'client_001',
        name: 'hamza',
        email: 'hamza@ecom.local',
        password: 'hamza123',
        role: 'client',
        activated: true
      });
    }

    this.saveUsers(users);
  }

  login(email: string, password: string) {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      throw new Error('Email ou mot de passe incorrect');
    }

    if (!user.activated) {
      throw new Error('Compte non activé');
    }

    localStorage.setItem(STORAGE_TOKEN, JSON.stringify(user));
    return user;
  }

  logout() {
    localStorage.removeItem(STORAGE_TOKEN);
  }

  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_TOKEN);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
