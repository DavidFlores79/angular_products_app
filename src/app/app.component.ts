import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'App de Productos';
  public identity: any;
  public token: any;
  
  @ViewChild('content') content: any;
  
  constructor( public _userService: UserService ) {
    this.loadUser();
  }

  public ngOnInit() {
    console.log('componente login lanzado');

    $(window).on('resize', function() {
        $("#menuModal").modal("hide");
    });

    $('.nav-item .nav-link').on('click', () => {
      $("#menuModal").modal("hide");
    })
  }

  ngDoCheck() {
    console.log('doCheck');
    this.loadUser();
  }

  public loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  
}
