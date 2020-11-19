import { Component, OnInit } from '@angular/core';
declare var tata: any;

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
  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="para_farmacia"){
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
