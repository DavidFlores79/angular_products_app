import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public page_title: string;
  public user: User;

  constructor() {
    this.page_title = 'Identifícate';
    this.user = new User(1, '', '', '','','','USER_ROLE', true, true, '', '');
  }

  public ngOnInit() {
    console.log('componente register lanzado');
  }

  onSubmit(registerForm: any) {
    console.log(this.user);
    registerForm.reset();
  }

}
