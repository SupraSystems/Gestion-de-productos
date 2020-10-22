import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuario="Pepe";
  constructor() { }

  ngOnInit(): void {
    this.precionar_amburguesa()
  }
  
  precionar_amburguesa() {
    if ($("#amburguesa").attr('aria-expanded') === "true") {
      $("#amburguesa").click();
    }
  }

  getUsuarioSesion(){
    return true;
  }

  cerrarSesion(){
  }
}

