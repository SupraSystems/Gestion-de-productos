import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-para-farmacia',
  templateUrl: './para-farmacia.component.html',
  styleUrls: ['./para-farmacia.component.css']
})
export class ParaFarmaciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "para_farmacia");
    localStorage.setItem('titulo','productos para farmacia');  
  }

}
