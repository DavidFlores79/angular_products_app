import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { global } from './global';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url: string;
  public token: any;

  constructor( private _http: HttpClient, )
  { 
    this.url = global.url;
  }
  
  showData( user: User ): Observable<any> {
    
    // console.log('logueado', user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/api/roles/'+user.role._id, { headers: headers});

  }
}
