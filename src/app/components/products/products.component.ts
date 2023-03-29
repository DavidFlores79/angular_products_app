import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public page_title: string;

  constructor() {
    this.page_title = 'Productos';
  }

  ngOnInit(): void {
    console.log('componente productos lanzado!');
  }
}
