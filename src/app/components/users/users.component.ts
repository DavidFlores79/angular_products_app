//Por Default
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  faPencilAlt,
  faTrash,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
//Del CRUD
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { Role } from 'src/app/models/role.model';
import { global } from 'src/app/services/global';

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
  public resetVar: boolean;
  public token: any = this._datoService.getToken();
  public url = global.url;

  public afuConfig = <any>{
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: this.url + '/api/upload/cloud/users',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: '',
    replaceTexts: {
      selectFileBtn: 'Selecciona archivos',
      resetBtn: 'Resetear',
      uploadBtn: 'Cargar',
      dragNDropBox: 'Arrastrar y Soltar',
      attachPinBtn: '',
      afterUploadMsg_success: 'Cargado correctamente!',
      afterUploadMsg_error: 'Falló la carga!',
      sizeLimit: 'Límite excedido',
    },
  };

  constructor(public _datoService: UserService, private _router: Router) {
    this.page_title = 'Usuarios';
    this.dato = new User(
      0,
      '',
      '',
      '',
      '',
      '',
      new Role(0, '', [], true, false, '', ''),
      true,
      false,
      '',
      ''
    );
    this.errorMessages = [];
    this.successMsg = '';
    this.datos = [];
    this.roles = [];
    this.resetVar = true;
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
        let mensaje = '';
        if (error.error.errors && error.error.errors.length > 0) {
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.msg;
        }

        switch (error.status) {
          case 401:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
            this._router.navigate(['inicio']);              
            break;
          case 403:
            this._router.navigate(['sin-acceso']);
            break;
        
          default:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
            break;
        }
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
      '',
      true,
      false,
      '',
      ''
    );
    $('#createModal').modal('show');
  }

  postDato(createForm: any) {
    console.log(this.dato);
    // return;
    this._datoService.postUser(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.datos.push(response.data);
        this.successMsg = response.msg;
        $('#createModal').modal('hide');
        Swal.fire({
          title: this.page_title,
          text: response.msg ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setTimeout(() => {
          this.successMsg = '';
          this.errorMessages = [];
          createForm.reset();
          this.resetVar = false;
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);

        // $('#createModal').modal('hide');
        let mensaje = '';
        if (error.error.errors && error.error.errors.length > 0) {
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.msg;
        }

        if (error.status == 401) {
          Swal.fire({
            title: this.page_title,
            text: mensaje,
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText: 'Cerrar Sesión',
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

  editDato(user: User) {
    console.log('user', user);
    this.dato = user;
    $('#editModal').modal('show');
  }

  updateDato(editForm: any) {
    this._datoService.update(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        // this.dato = response.data;
        this.datos = this.datos.map((dato) =>
          dato._id == response.data._id ? (dato = response.data) : dato
        );
        $('#editModal').modal('hide');

        Swal.fire({
          title: this.page_title,
          text: response.msg ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);

        $('#editModal').modal('hide');
        let mensaje = '';
        if (error.error.errors && error.error.errors.length > 0) {
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.msg;
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
        this.successMsg = response.msg;
        this.datos = this.datos.filter((user) => user._id != this.dato._id);
        $('#deleteModal').modal('hide');
        Swal.fire({
          title: this.page_title,
          text: response.msg ?? 'Todo bien!',
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
        if (error.error.errors && error.error.errors.length > 0) {
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.msg;
        }

        if (error.status == 401) {
          Swal.fire({
            title: this.page_title,
            text: mensaje,
            showDenyButton: true,
            confirmButtonText: 'Continuar',
            denyButtonText: 'Cerrar Sesión',
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

  avatarUpload(evt: any) {
    console.log(evt);
    let myImage = evt.body.data;
    this.dato.image = myImage;
  }
}
