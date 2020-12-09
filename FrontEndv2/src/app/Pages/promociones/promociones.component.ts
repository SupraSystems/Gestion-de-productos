import { Component, OnInit } from '@angular/core';
declare var tata: any;

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "promociones");
    localStorage.setItem('titulo', 'productos en promocion');
  }

  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="productos_en_promocion"){
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
