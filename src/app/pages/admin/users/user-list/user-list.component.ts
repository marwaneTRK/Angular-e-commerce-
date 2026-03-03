import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/users/user.service';
import { ConfirmModalComponent } from '../../../../shared/ui/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink,ConfirmModalComponent ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
    users : any =[];
      showModal = false;
  selectedId!: number;

    constructor(private userService:UserService,  private toastr: ToastrService
 ){

    }

  ngOnInit(): void {
  this.users = this.userService.getAll();
  }
 openModal(id: number) {
    this.selectedId = id;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDelete() {
    this.userService.delete(this.selectedId);
    this.toastr.success('utilisateur supprimé avec succès');
    this.users = this.userService.getAll();
    this.closeModal();
  }
}
