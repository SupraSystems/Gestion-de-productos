import { Component, OnInit } from '@angular/core';
declare var tata: any;

@Component({
  selector: 'app-todos-los-productos',
  templateUrl: './todos-los-productos.component.html',
  styleUrls: ['./todos-los-productos.component.css']
})
export class TodosLosProductosComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "todos_los_productos");
    localStorage.setItem('titulo','todos los productos');  
  }
  mostrarMensaje(obj) {
    console.log("<<<<>>>>>>", obj.ruta)
    console.log("<<<<>>>>>>", obj.ruta)
    console.log("<<<<>>>>>>", obj.ruta)
    if(obj.ruta=="todos_los_productos"||obj.ruta=="Inicio" || obj.ruta =="home" ){
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
        duration: 6000,
        animate: 'slide',
        closeBtn: false
      });
    }

}
