//Por Default
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faPencilAlt, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//Del CRUD
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../models/product.model';
import { Category } from 'src/app/models/category.model';
import { global } from 'src/app/services/global';

//JQuery
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService], //Para user el Servicio
})
export class ProductsComponent {
  public page_title: string;
  public dato: Product;
  public datos: Product[];
  public categories: Category[];
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
      url: this.url + '/api/upload/cloud/products',
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

  constructor(public _datoService: ProductService, private _router: Router) {
    this.page_title = 'Productos';
    this.dato = new Product(0, '', 0, true, true, 0, new Category(0, '', false, '', undefined, undefined), '', undefined, undefined);
    this.errorMessages = [];
    this.successMsg = '';
    this.datos = [];
    this.categories = [];
    this.resetVar = true;
  }

  ngOnInit(): void {
    console.log('componente Usuarios lanzado!');
    this.getDatos();
    this.getCategories();
  }

  getDatos() {
    this._datoService.getProducts().subscribe({
      next: (response) => {
        console.log('response', response);
        this.datos = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
      
    });
  }

  getCategories() {
    this._datoService.getCategories().subscribe({
      next: (response) => {
        console.log('response', response);
        this.categories = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error);
      },
      
    });
  }

  createDato() {
    this.dato = new Product(0, '', 0, true, true, 0, this.categories[0], '', undefined, undefined);
    console.log('dato', this.dato);
    
    $('#createModal').modal('show');
  }

  postDato(createForm: any) {
    this._datoService.postProduct(this.dato).subscribe({
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
        if(error.error.errors &&  error.error.errors.length > 0) {
          
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.msg;
        }

        if(error.status == 401) {
          Swal.fire({
            title: this.page_title,
            text: mensaje ?? error.error.msg,
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

  editDato(product: Product) {
    console.log('product', product);
    this.dato = product;
    $('#editModal').modal('show');
  }

  updateDato(editForm: any) {
    this._datoService.update(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        // this.dato = response.data;
        this.datos = this.datos.map(dato => (dato._id == response.data._id) ? dato = response.data : dato);
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
        if(error.error.errors &&  error.error.errors.length > 0) {
          
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

  confirmDelete(product: Product) {
    this.dato = product;
    $('#deleteModal').modal('show');
  }

  deleteDato() {
    console.log('product', this.dato);

    this._datoService.delete(this.dato).subscribe({
      next: (response) => {
        console.log(response);
        this.successMsg = response.msg;
        this.datos = this.datos.filter(product => product._id != this.dato._id);
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
        if(error.error.errors && error.error.errors.length > 0) {
          
          for (let i in error.error.errors) {
            mensaje += error.error.errors[i].msg + '\n';
          }
        } else {
          mensaje = error.error.msg;
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

  productUpload(evt: any) {
    console.log(evt);
    let myImage = evt.body.data;
    this.dato.image = myImage;
  }

}
