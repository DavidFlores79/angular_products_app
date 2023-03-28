import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'App de Productos';
  showModalBox: boolean = false;
  public identity: any;
  public token: any;

  @ViewChild('content') content: any;
  
  constructor( public _userService: UserService ) {
    this.loadUser();
  }

  public ngOnInit() {
    console.log('componente login lanzado');
  }

  ngDoCheck() {
    console.log('doCheck');
    this.loadUser();
  }

  public open() {
    if (0) {
      // Dont open the modal
      this.showModalBox = false;
    } else {
      // Open the modal
      this.showModalBox = true;
    }
  }

  public loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  
}
