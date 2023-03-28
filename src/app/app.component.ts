import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'App de Productos';
  showModalBox: boolean = false;

  @ViewChild('content') content: any;
  public ngOnInit() {
    console.log('componente login lanzado');
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
}
