import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { global } from './global';



@Injectable()

export class UserService {

    url: string;
    public identity: any;
    public token: any;

    constructor( public _http: HttpClient ) { this.url = global.url }

    test() {
        return "Hola mundo desde el servicio!";
    }

    register( user: User ): Observable<any> {

        let body = user;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/api/users', body, { headers: headers});
        
    }

    login( user: User ): Observable<any> {

        let body = user;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'/auth/login', body, { headers: headers});
        
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