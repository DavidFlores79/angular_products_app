import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public page_title: string;

  constructor(  ) {
    this.page_title = 'Identifícate';
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

}
