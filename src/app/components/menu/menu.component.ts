import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ UserService ]
})
export class MenuComponent implements OnInit {

  public identity: any;
  public menus: any;

  constructor( 
    private _userService: UserService, 
    private _titleService: Title, 
    private _menuService: MenuService,
    ) { this.menus = []; }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    if(this.identity) this.getMenuInfo();
  }

  setDocTitle(title: string) {
    // console.log('current title:::::' + this._titleService.getTitle());
    this._titleService.setTitle(`Angular App | ${title}`);
  }

  getMenuInfo() {
    this._menuService.showData( this._userService.getIdentity() ).subscribe({

        next: (response) => {
          // console.log('response menu ', response);
          this.menus = response.data.modules;
          // console.log('menu ', this.menus);
        },
        error: (error: HttpErrorResponse) => {
          // console.log('error', error);
          let mensaje = '';
          if (error.error.errors && error.error.errors.length > 0) {
            for (let i in error.error.errors) {
              mensaje += error.error.errors[i].msg + '\n';
            }
          } else {
            mensaje = error.error.msg;
          }
  
          Swal.fire('this.page_title', mensaje ?? 'Error al obtener menú.', 'error');
        },

    })
  }

}
