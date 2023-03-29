import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 
  public page_title: string;

  constructor() {
    this.page_title = 'Perfil';
  }

  ngOnInit(): void {
    console.log('componente perfil lanzado!');
  }
}
