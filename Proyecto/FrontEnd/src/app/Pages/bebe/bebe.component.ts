import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bebe',
  templateUrl: './bebe.component.html',
  styleUrls: ['./bebe.component.css']
})
export class BebeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "bebe");
    localStorage.setItem('titulo','productos para bebe');  
  }

}
