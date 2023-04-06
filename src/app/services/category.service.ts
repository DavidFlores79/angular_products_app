import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { global } from './global';



@Injectable()

export class CategoryService {

    url: string;
    public identity: any;
    public token: any;

    constructor( public _http: HttpClient ) { this.url = global.url }

    test() {
        return "Hola mundo desde el servicio Roles!";
    }

    getCategories(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'/api/categories', { headers: headers});

    }

    postCategory( category: Category ): Observable<any> {

        let body = category;
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this._http.post(this.url+'/api/categories', body, { headers: headers});
        
    }

    register( category: Category ): Observable<any> {

        let body = category;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/api/categories', body, { headers: headers});
        
    }

    update( category: Category ): Observable<any> {

        let body = category;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(`${this.url}/api/categories/${category._id}`, body, { headers: headers});
        
    }

    delete( category: Category ): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json',)
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        console.log('headers', headers);
        
        return this._http.delete(`${this.url}/api/categories/${category._id}`, { headers: headers});
        
    }

    getIdentity () {
        let identity = localStorage.getItem('identity');
        this.identity = (identity && identity != 'undefined') ? JSON.parse(identity) : null;

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');
        this.token = (token && token != 'undefined') ? token : null;
        // console.log('token', this.token);
        return this.token;
    }
}