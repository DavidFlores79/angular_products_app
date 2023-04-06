//Por Default
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faPencilAlt, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//Del CRUD
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { Role } from 'src/app/models/role.model';

//JQuery
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService], //Para user el Servicio
})
export class UsersComponent {
  public page_title: string;
  public dato: User;
  public datos: User[];
  // public role: Role;
  public roles: Role[];
  public errorMessages: any;
  public successMsg: string;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  constructor(public _datoService: UserService, private _router: Router) {
    this.page_title = 'Usuarios';
    this.dato = new User(
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
    // this.role = new Role(0, '', true, false, '', '');
    this.errorMessages = [];
    this.successMsg = '';
    this.datos = [];
    this.roles = [];
  }

  ngOnInit(): void {
    console.log('componente Usuarios lanzado!');
    this.getDatos();
    this.getRoles();
  }

  getRoles() {
    this._datoService.getRoles().subscribe({
      next: (response) => {
        console.log('response roles', response);
        this.roles = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
      
    });
  }

  getDatos() {
    this._datoService.getUsers().subscribe({
      next: (response) => {
        console.log('response', response);
        this.datos = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
      
    });
  }

  createDato() {
    this.dato = new User(
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
    $('#createModal').modal('show');
  }

  postDato(createForm: any) {
    this._datoService.postUser(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.datos.push(response.data);
        this.successMsg = response.message;
        $('#createModal').modal('hide');
        Swal.fire({
          title: this.page_title,
          text: response.message ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
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

  editDato(user: User) {
    console.log('user', user);
    this.dato = user;
    $('#editModal').modal('show');
  }

  updateDato(editForm: any) {
    this._datoService.update(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.dato = response.data;
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
    this.dato = user;
    $('#deleteModal').modal('show');
  }

  deleteDato() {
    console.log('user', this.dato);

    this._datoService.delete(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.successMsg = response.message;
        this.datos = this.datos.filter(user => user._id != this.dato._id);
        $('#deleteModal').modal('hide');
        Swal.fire({
          title: this.page_title,
          text: response.message ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setTimeout(() => {
          this.successMsg = '';
          this.errorMessages = [];
        }, 3000);
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
