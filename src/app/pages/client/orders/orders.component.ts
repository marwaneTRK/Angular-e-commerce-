import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders = [
    {
      id: 101,
      date: '2024-11-01',
      total: 320,
      status: 'Delivered'
    },
    {
      id: 102,
      date: '2024-11-15',
      total: 150,
      status: 'Pending'
    }
  ];
}
