import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/users/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  form!: any;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    const user = this.userService.getById(this.userId);

    if (!user) {
      this.router.navigate(['/admin/users']);
      return;
    }

    this.form = this.fb.group({
      name: [user.name, Validators.required],
      email: [user.email, Validators.required],
      role: [user.role],
      activated: [user.activated]
    });
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

  submit() {
    this.userService.update(this.userId, this.form.value);
    this.router.navigate(['/admin/users']);
  }
}
