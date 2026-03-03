import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

  private users = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@ecom.local',
      role: 'admin',
      activated: true
    },
    {
      id: 2,
      name: 'Hamza',
      email: 'hamza@ecom.local',
      role: 'client',
      activated: true
    }
  ];

  getAll() {
    return [...this.users];
  }

  getById(id: number) {
    return this.users.find(u => u.id === id);
  }

  add(user: any) {
    user.id = Date.now();
    this.users.push(user);
  }

  update(id: number, data: any) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data };
    }
  }

  delete(id: number) {
  this.users = this.users.filter(u => u.id !== id);
}
}
