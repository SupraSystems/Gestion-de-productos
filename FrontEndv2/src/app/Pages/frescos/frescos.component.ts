import { Component, OnInit } from '@angular/core';
declare var tata: any;

@Component({
  selector: 'app-frescos',
  templateUrl: './frescos.component.html',
  styleUrls: ['./frescos.component.css']
})
export class FrescosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "frescos");
    localStorage.setItem('titulo','productos frescos');  
  }

  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="frescos"){
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
