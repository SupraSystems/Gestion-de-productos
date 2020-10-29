import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bassicos-del-hogar',
  templateUrl: './bassicos-del-hogar.component.html',
  styleUrls: ['./bassicos-del-hogar.component.css']
})
export class BassicosDelHogarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "basicos_del_hogar");
    localStorage.setItem('titulo','productos basicos del hogar');  
  }

}
