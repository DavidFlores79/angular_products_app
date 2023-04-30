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
import { global } from 'src/app/services/global';
import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/app/models/module.model';

//JQuery
declare var $: any;

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
  providers: [ModuleService], //Para user el Servicio
})
export class ModulesComponent {
  public page_title: string;
  public dato: Module;
  public datos: Module[];
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
    formatsAllowed: '.jpg, .png, .gif, .jpeg, .svg',
    maxSize: '50',
    uploadAPI: {
      url: this.url + '/api/upload/cloud/modules',
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

  constructor(public _datoService: ModuleService, private _router: Router) {
    this.page_title = 'Módulos';
    this.dato = new Module(0, '', '', '', true, undefined, undefined);
    this.errorMessages = [];
    this.successMsg = '';
    this.datos = [];
    this.resetVar = true;
  }

  ngOnInit(): void {
    console.log('componente Usuarios lanzado!');
    this.getDatos();
  }

  getDatos() {
    this._datoService.getDatos().subscribe({
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
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error').then(
              () => this._router.navigate(['home'])
            );
            break;
          case 403:
            this._router.navigate(['no-access']);
            break;

          default:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
            break;
        }
      },
    });
  }

  createDato() {
    this.dato = this.dato = new Module(
      0,
      '',
      '',
      '',
      true,
      undefined,
      undefined
    );
    console.log('dato', this.dato);

    $('#createModal').modal('show');
  }

  postDato(createForm: any) {
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

        switch (error.status) {
          case 401:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error').then(
              () => this._router.navigate(['home'])
            );
            break;
          default:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
            break;
        }
      },
    });
  }

  editDato(module: Module) {
    console.log('module', module);
    this.dato = module;
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

        switch (error.status) {
          case 401:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error').then(
              () => this._router.navigate(['home'])
            );
            break;
          default:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
            break;
        }
      },
    });
  }

  confirmDelete(module: Module) {
    this.dato = module;
    $('#deleteModal').modal('show');
  }

  deleteDato() {
    console.log('product', this.dato);

    this._datoService.delete(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.successMsg = response.msg;
        this.datos = this.datos.filter(
          (product) => product._id != this.dato._id
        );
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

        switch (error.status) {
          case 401:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error').then(
              () => this._router.navigate(['home'])
            );
            break;
          default:
            Swal.fire(this.page_title, mensaje ?? 'Todo mal!', 'error');
            break;
        }
      },
    });
  }

  imageUpload(evt: any) {
    console.log(evt);
    let myImage = evt.body.data;
    this.dato.image = myImage;
  }
}
