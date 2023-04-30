import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {

  public page_title: string = 'Acceso Restringido!';

  constructor( private _router: Router, private _titleService: Title ) {}

  public ngOnInit() {
    // console.log('componente login lanzado');
    this._titleService.setTitle(`Angular App | ${this.page_title}`);
  }

  redirectHome() {
    this._router.navigate(['home']);
  }

}
