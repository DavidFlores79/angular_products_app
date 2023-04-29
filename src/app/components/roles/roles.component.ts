//Por Default
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  faPencilAlt,
  faTrash,
  faPlusCircle,
  faTh,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
//Del CRUD
import { global } from 'src/app/services/global';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role.model';
import { Module } from 'src/app/models/module.model';
import { Permission } from 'src/app/models/permission.model';
import { Profile } from 'src/app/models/profile.model';

//JQuery
declare var $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [RoleService], //Para user el Servicio
})
export class RolesComponent {
  public page_title: string;
  public dato: Role;
  public datos: Role[];
  public appModules: Module[];
  public appPermissions: Permission[];
  public modulesPermissions: Profile[];
  public permissions: any[];
  public errorMessages: any;
  public successMsg: string;
  public saveAndExit: boolean;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;
  faTh = faTh;
  faUserLock = faUserLock;

  public resetVar: boolean;
  public token: any = this._datoService.getToken();
  public url = global.url;

  constructor(public _datoService: RoleService, private _router: Router) {
    this.page_title = 'Roles';
    this.dato = new Role(0, '', [], true, false, undefined, undefined);
    this.errorMessages = [];
    this.successMsg = '';
    this.datos = [];
    this.appModules = [];
    this.appPermissions = [];
    this.permissions = [];
    this.resetVar = true;
    this.saveAndExit = false;
    this.modulesPermissions = [];
  }

  public ngAfterViewInit(): void {
    console.log('ngAfterViewInit...');
  }

  ngOnInit(): void {
    console.log('componente roles lanzado!');
    this.getModules();
    this.getPermissions();
    this.getDatos();
  }

  getModules() {
    this._datoService.getModules().subscribe({
      next: (response) => {
        console.log('modules response', response);
        this.appModules = response.data;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
    });
  }

  getPermissions() {
    this._datoService.getPermissions().subscribe({
      next: (response) => {
        console.log('permissions response', response);
        this.appPermissions = response.data;
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
    });
  }

  getDatos() {
    this._datoService.getDatos().subscribe({
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
    this.dato = new Role(0, '', [], true, false, undefined, undefined);
    console.log('dato', this.dato);
    $('#createModal').modal('show');
  }

  postDato(createForm: any) {
    // console.log(this.dato); return;

    this._datoService.postDato(this.dato).subscribe({
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
          $('.selectpicker').val('default').selectpicker('refresh'); // refresh the selectpicker with fetched courses
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);

        $('#createModal').modal('hide');
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
            text: mensaje ?? error.error.msg,
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

  editDato(role: Role) {
    console.log('module', role);
    this.dato = role;
    $('#editModal').modal('show');
  }

  updateDato(editForm: any) {
    console.log('editForm', editForm.value);
    // return;
    editForm.value._id = this.dato._id; //asignar el id del rol al objeto para actualizar.
    this._datoService.update(editForm.value).subscribe({
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

  confirmDelete(role: Role) {
    this.dato = role;
    $('#deleteModal').modal('show');
  }

  deleteDato() {
    console.log('role', this.dato);

    this._datoService.delete(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.successMsg = response.msg;
        this.datos = this.datos.filter((role) => role._id != this.dato._id);
        $('#deleteModal').modal('hide');
        Swal.fire({
          title: this.page_title,
          text: response.msg ?? 'Todo bien!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
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

  getProfileByRole(role: any) {
    this._datoService.getProfileByRole(role).subscribe({
      next: (response) => {
        // console.log('Profile response', response);
        this.modulesPermissions = response.data;
        this.modulesPermissions.forEach((el) => {
          this.permissions.push(el.permissions);
        });
        // console.log('modulesPermissions', this.modulesPermissions);
        // console.log('permissions', this.permissions);
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Permissions error', error);
      },
    });
  }

  profileModal(role: Role) {
    console.log('role', role.name);
    this.dato = role;
    this.permissions = [];
    this.getProfileByRole(role._id);
    this.saveAndExit = false;
    $('#profileModal').modal('show');
  }

  saveProfile(permissionsForm: any) {
    let dataRaw: any[] = [];
    this.appModules.forEach((value, key) => {
      dataRaw.push({
        module: value._id,
        permissions: this.permissions[key],
        role: this.dato._id,
      });
    });

    this._datoService.saveProfile({ profile: dataRaw }).subscribe({
      next: (response) => {
        console.log('Profile response', response);
        $('#profileModal').modal('hide');
        Swal.fire(this.page_title, response.msg ?? 'Todo bien!', 'success');
      },
      error: (error: HttpErrorResponse) => {
        console.log('Profile error', error);
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
            text: mensaje ?? error.error.msg,
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
}
