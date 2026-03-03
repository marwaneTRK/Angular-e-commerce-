import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/users/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-add',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['client'],
    activated: [true]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  submit() {
    this.userService.add(this.form.value);
    this.router.navigate(['/admin/users']);
  }

     get email() {
    return this.form.get('email');
  }

  get name() {
    return this.form.get('name');
  }
  get role() {
    return this.form.get('role');
  }

}
