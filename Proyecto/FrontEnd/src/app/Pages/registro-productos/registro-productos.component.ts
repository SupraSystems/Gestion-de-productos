import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrls: ['./registro-productos.component.css']
})
export class RegistroProductosComponent implements OnInit {
  min:Date;

  constructor() {
    const dia = new Date().getDate();
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.min = new Date(anio, mes, dia);
   }

  ngOnInit(): void {
    
   
  }

}