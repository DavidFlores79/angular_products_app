import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Role } from "../models/role.model";
import { global } from './global';



@Injectable()

export class RoleService {

    url: string;
    public identity: any;
    public token: any;

    constructor( public _http: HttpClient ) { this.url = global.url }

    test() {
        return "Hola mundo desde el servicio Roles!";
    }

    getRoles(): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'/api/roles', { headers: headers});

    }

    postRole( role: Role ): Observable<any> {

        let body = role;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/api/roles', body, { headers: headers});
        
    }

    register( role: Role ): Observable<any> {

        let body = role;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/api/roles', body, { headers: headers});
        
    }

    update( role: Role ): Observable<any> {

        let body = role;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(`${this.url}/api/roles/${role._id}`, body, { headers: headers});
        
    }

    delete( role: Role ): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json',)
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        console.log('headers', headers);
        
        return this._http.delete(`${this.url}/api/roles/${role._id}`, { headers: headers});
        
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