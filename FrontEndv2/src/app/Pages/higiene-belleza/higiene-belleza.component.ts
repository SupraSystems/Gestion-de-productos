import { Component, OnInit } from '@angular/core';
declare var tata: any;

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

  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="higiene_y_belleza"){
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
