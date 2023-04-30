import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { global } from './global';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string;

  constructor(private _userService: UserService, public _http: HttpClient, private _menuService: MenuService) {
    this.url = global.url;
  }

  login(user: User): Observable<any> {
    let body = user;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/auth/login', body, {
      headers: headers,
    });
  }

  register(user: User): Observable<any> {
    let body = user;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/auth/register', body, { headers: headers });
  }

  isLoggedIn$(): Observable<boolean> {
    let identity = localStorage.getItem('identity');
    if (!identity) return of(false);
    return of(true);
  }

  isAdmin$(): Observable<boolean> {
    let identity: User = this._userService.getIdentity();
    if (identity.role.name != 'ADMIN_ROLE') return of(false);
    return of(true);
  }
}
