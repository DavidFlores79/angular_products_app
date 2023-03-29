import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService],
})
export class UsersComponent {
  public page_title: string;
  public user: User;
  public users: User[];
  public errorMessages: any;
  public successMsg: string;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(public _userService: UserService, private _router: Router) {
    this.page_title = 'Usuarios';
    this.user = new User(
      0,
      '',
      '',
      '',
      '',
      '',
      'USER_ROLE',
      true,
      false,
      '',
      ''
    );
    this.errorMessages = [];
    this.successMsg = '';
    this.users = [];
  }

  ngOnInit(): void {
    console.log('componente Usuarios lanzado!');
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe({
      next: (response) => {
        console.log('response', response);
        this.users = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
      
    });
  }

  postUser(createForm: any) {
    this._userService.postUser(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.successMsg = response.message;
        createForm.reset();

        setTimeout(() => {
          this.successMsg = '';
          this.errorMessages = [];
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);

        $('#createModal').modal('hide');
        let mensaje = '';
        if(error.error.errors &&  error.error.errors.length > 0) {
          
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.message;
        }

        Swal.fire({
          title: this.page_title,
          text: mensaje ?? 'Todo mal!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
      
    });
  }

  editUser(user: User) {
    console.log('user', user);
    this.user = user;
    $('#editModal').modal('show');
  }

  updateUser(editForm: any) {
    this._userService.update(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.user = response.data;
        editForm.reset();
        $('#editModal').modal('hide');

        Swal.fire({
          title: this.page_title,
          text: response.message ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);

        $('#editModal').modal('hide');
        let mensaje = '';
        if(error.error.errors &&  error.error.errors.length > 0) {
          
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.message;
        }

        Swal.fire({
          title: this.page_title,
          text: mensaje ?? 'Todo mal!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
      
    });
  }

  confirmDelete(user: User) {
    this.user = user;
    $('#deleteModal').modal('show');
  }

  deleteUser() {
    console.log('user', this.user);

    this._userService.delete(this.user).subscribe({
      next: (response) => {
        console.log(response);
        this.successMsg = response.message;
        this.users = this.users.filter(user => user._id != this.user._id);
        $('#deleteModal').modal('hide');
        Swal.fire({
          title: this.page_title,
          text: response.message ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);

        $('#deleteModal').modal('hide');
        let mensaje = '';
        if(error.error.errors && error.error.errors.length > 0) {
          
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.message;
        }

        if(error.status == 401) {
          Swal.fire({
            title: this.page_title,
            text: mensaje,
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText: 'Cerrar Sesión'
          }).then((result) => {
            if (result.isDenied) {
              this._router.navigate(['/logout/1']);
            } 
          });            
        } else {
          Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
        }
        
      },
      
    });
  }

}
