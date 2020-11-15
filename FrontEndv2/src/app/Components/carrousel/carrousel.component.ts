import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  listaCatalogos: string[] = [];
  imgCatalogo = "";
  titulo = "";
  hrefArchivo="";

  constructor(private router: Router){
  }


  ngOnInit(): void {
    this.titulo = localStorage.getItem('titulo');
    this.enlistar();


  }
  enlistar(){
    this.listaCatalogos.push("../../../assets/Images/Carrousel/img1.jpg");
    this.listaCatalogos.push("../../../assets/Images/Carrousel/img2.jpg");
    this.listaCatalogos.push("../../../assets/Images/Carrousel/img3.jpg");
  }

}
