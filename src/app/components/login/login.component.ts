import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService, AuthService ] 
})
export class LoginComponent implements OnInit{

  public page_title: string;
  public user: User;
  public errorMessages: any;
  public successMsg: string;
  public token: any;
  public identity: any;

  constructor( private _authService: AuthService, private _router: Router, private _route: ActivatedRoute ) {
    this.page_title = 'Identifícate';
    this.user = new User(0, '', '', '','','','USER_ROLE', true, false, '', '');
    this.errorMessages = [];
    this.successMsg = '';
    this.token = null;
    this.identity = null;
  }

  public ngOnInit() {
    console.log('componente login lanzado');
    this.logout();
  }

  onSubmit(loginForm: any) {
    
    this._authService.login(this.user).subscribe({
      next: (response) =>{
         
         this.token = response.jwt;
         this.identity = response.user;

         //guardar los datos del usuario
         localStorage.setItem('token', this.token);
         localStorage.setItem('identity', JSON.stringify(this.identity));

         loginForm.reset();
         this._router.navigate(['/inicio']);
      },
      error: (error: HttpErrorResponse) => {
        console.log('Login error', error);
        
        this.errorMessages = error.error.errors ?? [ error.error ];
        console.log(this.errorMessages);
      },
      complete: () => console.info('complete') 
    });
  }

  logout() {
    this._route.params.subscribe( params => {
      let logout = +params['sure'];

      if(logout == 1) {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.identity = null;
        this.token = null;
        /**redireccion a inicio */
        this._router.navigate(['/login']);
      }

    });
  }
}
