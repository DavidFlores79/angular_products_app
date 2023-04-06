import { Component, OnInit } from '@angular/core';

//JQuery
declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ngOnInit(): void {
    console.log('componente Chat lanzado!');
  }

}
