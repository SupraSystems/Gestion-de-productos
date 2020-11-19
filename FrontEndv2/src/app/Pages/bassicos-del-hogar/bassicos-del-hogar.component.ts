import { Component, OnInit } from '@angular/core';
declare var tata: any;

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
  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="basicos_del_hogar"){
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
