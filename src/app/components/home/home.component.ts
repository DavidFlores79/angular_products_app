import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Nom } from 'src/app/models/nom.model';
import { NomService } from 'src/app/services/nom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NomService],
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public errorMessages: any;
  public successMsg: string;
  public data: Nom;
  public noms: any;

  constructor(private _nomService: NomService ) {
    this.page_title = 'Inicio';
    this.errorMessages = [];
    this.successMsg = '';
    this.data = { articulo: '', nom: '' };
    this.noms = [];
  }

  ngOnInit(): void {
    // console.log('componente home lanzado!');
    this.noms = [
      { id: '050', name: 'Norma 050'},
      { id: '051', name: 'Norma 051'},
    ];
  }

  onSubmit(nomForm: any) {
    // console.log(this.data);
    this._nomService.getNomFile(this.data).subscribe({
      next: (response) => {
        // console.log('response', response);

        /** Si salio bien es un archivo */
        // let url = window.URL.createObjectURL(response);
        // window.open(url);
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(response)
        a.href = objectUrl
        a.download = `Norma ${this.data.nom}.pdf`;
        a.click();
        URL.revokeObjectURL(objectUrl);

        nomForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        // console.log('Error', error);

        /** Si no hay conexion al server */
        if(error.status == 0) {
          Swal.fire(this.page_title, 'No hay conexion con el servidor!', 'error');
          return;
        }

        /** Si salio mal es un json hay que parsear de Blob a JSON 
         * y mostrar el Swal
        */
        const fr = new FileReader();
        let errorResponse: any = {};

        if(error.error.type != 'error') {
          fr.onload = (e) => {
            errorResponse = JSON.parse(e.target?.result as string);
            Swal.fire(this.page_title, errorResponse.message ?? 'Todo mal!', errorResponse.status ?? 'error');
            // console.log('error response', errorResponse );
          };
          fr.readAsText(error.error);
        }
        
      },
      complete: () => console.info('complete'),
    });
  }
}
