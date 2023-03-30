import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { global } from './global';



@Injectable()

export class ProductService {

    url: string;
    public token: any;

    constructor( public _http: HttpClient ) { this.url = global.url }

    test() {
        return "Hola mundo desde el servicio PRODUCT!";
    }

    getProducts(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'/api/products', { headers: headers});

    }

    postProduct( product: Product ): Observable<any> {

        let body = product;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/api/products', body, { headers: headers});
        
    }

    register( product: Product ): Observable<any> {

        let body = product;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/api/products', body, { headers: headers});
        
    }

    update( product: Product ): Observable<any> {

        let body = product;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(`${this.url}/api/products/${product._id}`, body, { headers: headers});
        
    }

    delete( product: Product ): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json',)
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        console.log('headers', headers);
        
        return this._http.delete(`${this.url}/api/products/${product._id}`, { headers: headers});
        
    }

    getToken() {
        let token = localStorage.getItem('token');
        this.token = (token && token != 'undefined') ? token : null;
        // console.log('token', this.token);
        return this.token;
    }
}