import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  public page_title: string;

  constructor() {
    this.page_title = 'Categorías';
  }

  ngOnInit(): void {
    console.log('componente categorías lanzado!');
  }
}
