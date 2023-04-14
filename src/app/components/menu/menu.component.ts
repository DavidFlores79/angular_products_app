import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ UserService ]
})
export class MenuComponent implements OnInit {

  public identity: any;

  constructor( private _userService: UserService, private _titleService: Title) {}

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this._titleService.getTitle());
    this._titleService.setTitle(`Angular App | ${title}`);
  }

}
