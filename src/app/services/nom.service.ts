import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from './global';
import { Nom } from "../models/nom.model";



@Injectable()

export class NomService {

    url: string;

    constructor( public _http: HttpClient ) { this.url = global.prov_QA }

    test() {
        return "Hola mundo desde el servicio Roles!";
    }

    getNomFile( data: any ): Observable<any> {

        let headers = new HttpHeaders().set('Accept', 'application/json');
        return this._http.get(`${this.url}/api/nom/download-file`, { headers: headers, responseType: 'blob', params: data});

    }

}