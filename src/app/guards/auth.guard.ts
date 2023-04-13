import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable()

export class AuthGuard implements CanActivate {

    constructor( private _userService: UserService, private _router: Router ) {}

    canActivate(): boolean {

        let identity = this._userService.getIdentity()

        if(!identity) {
            this._router.navigate(['/login']);
            return false;
        }
        
        return true;

    }
}