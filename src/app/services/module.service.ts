import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../models/module.model';
import { global } from './global';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  url: string;
  public token: any;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  test() {
    return 'Hola mundo desde el servicio MODULO!';
  }

  getDatos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/api/modules', { headers: headers });
  }

  postDato(module: Module): Observable<any> {
    let body = module;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this._http.post(this.url + '/api/modules', body, {
      headers: headers,
    });
  }

  register(module: Module): Observable<any> {
    let body = module;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/api/modules', body, {
      headers: headers,
    });
  }

  update(module: Module): Observable<any> {
    let body = module;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.url}/api/modules/${module._id}`, body, {
      headers: headers,
    });
  }

  delete(module: Module): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log('headers', headers);

    return this._http.delete(`${this.url}/api/modules/${module._id}`, {
      headers: headers,
    });
  }

  getToken() {
    let token = localStorage.getItem('token');
    this.token = token && token != 'undefined' ? token : null;
    // console.log('token', this.token);
    return this.token;
  }
}
