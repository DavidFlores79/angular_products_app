import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

/** Se tiene que cargar el servicio dentro 
 * de una propiedad del componente, se inyecta
 *  la dependencia y con eso se tiene una 
 * instancia  */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService, AuthService ] 
})
export class RegisterComponent implements OnInit{

  public page_title: string;
  public user: User;
  public errorMessages: any;
  public successMsg: String;
  

  constructor( private _authService: AuthService, private _router: Router ) {
    this.page_title = 'Identifícate';
    this.user = new User(0, '', '', '','','',undefined, true, true, '', '');
    this.errorMessages = [];
    this.successMsg = '';
  }

  public ngOnInit() {
    this._authService.isLoggedIn$().subscribe({
      next: (isLoggedIn) =>{
        // console.log('next', isLoggedIn);
        if(isLoggedIn) {
          this._router.navigate(['home']);
        } 
     },
     error: (error: HttpErrorResponse) => {       
      //  console.log('error', error);
     },
    })

  }

  onSubmit(registerForm: any) {

    this._authService.register(this.user).subscribe({
      next: (response) =>{
        //  console.log(response);
         this.successMsg = response.message;
         registerForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        
        switch (error.status) {
          case 400:
            this.errorMessages = error.error.errors;      
            break;
          default:
            this.errorMessages = error.error.errors;
            break;
        }
        // console.log(this.errorMessages);
      },
      complete: () => console.info('complete') 
    });    
  }

}
