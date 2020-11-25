import { Component, OnInit } from '@angular/core';
declare var tata: any;

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css']
})
export class CombosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "combos");
    localStorage.setItem('titulo','productos en combos'); 
  }
  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="productos_combos"){
      if(obj.tipo=="exito"){
        this.toastExitoso("Se encontraron los siguientes productos coincidentes")            
      }else{
        this.toastError("no se encontraron productos coincidentes")
      }
    }
  }
  toastError(msj: string) {
    tata.error('Error', msj+" ", {
      duration: 4000,
      animate: 'slide',
      closeBtn: false
    });
  }
  toastExitoso(msj: string) {
      tata.success('Exito', msj, {
        duration: 4000,
        animate: 'slide',
        closeBtn: false
      });
    }

}
