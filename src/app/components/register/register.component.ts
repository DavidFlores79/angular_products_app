import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

/** Se tiene que cargar el servicio dentro 
 * de una propiedad del componente, se inyecta
 *  la dependencia y con eso se tiene una 
 * instancia  */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ] 
})
export class RegisterComponent implements OnInit{

  public page_title: string;
  public user: User;
  public errorMessages: any;
  public successMsg: String;
  

  constructor( private _userService: UserService ) {
    this.page_title = 'Identifícate';
    this.user = new User(1, '', '', '','','','USER_ROLE', true, true, '', '');
    this.errorMessages = [];
    this.successMsg = '';
  }

  public ngOnInit() {
    console.log('componente register lanzado');
  }

  onSubmit(registerForm: any) {

    this._userService.register(this.user).subscribe({
      next: (response) =>{
         console.log(response);
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
        console.log(this.errorMessages);
      },
      complete: () => console.info('complete') 
    });

    // this._userService.register(this.user).subscribe(
    //   response => {
    //     console.log('response', response);
    //     registerForm.reset();
    //   },
    //   error => {
    //     console.log('error', <any> error);
    //   }
    // );
    
  }

}
