import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-higiene-belleza',
  templateUrl: './higiene-belleza.component.html',
  styleUrls: ['./higiene-belleza.component.css']
})
export class HigieneBellezaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "higiene_y_belleza");
    localStorage.setItem('titulo','productos para higiene y belleza');  
  }

}
