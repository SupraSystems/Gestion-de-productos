import { Component, OnInit } from '@angular/core';
import { RegistroDescuentosComponent } from '../registro-descuentos/registro-descuentos.component';
import { Producto } from '../../Models/Producto';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;

}
declare var $: any;

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrls: ['./registro-productos.component.css']
})
export class RegistroProductosComponent implements OnInit {
  min: Date;
  ruta = "";
  producto: Producto = new Producto("","",0,0,"","","","");
  file: File;
  listaProducto:Producto[]=[]
  valido1=false;
  constructor() {
    const dia = new Date().getDate();
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.min = new Date(anio, mes, dia);
  }

  ngOnInit(): void {

  }

  enlistar() {
    let nombre = $("#nombre").val();
    let precio = $("#precio").val();
    let fecha = new Date()// $("#pickerm3").val()
    let dia=fecha.getDay();
    let mes=fecha.getMonth();
    let anio=fecha.getFullYear();
    let fechaV=dia+"/"+mes+"/"+anio;
    let cantidad = $("#cantidad").val();
    let categoria = $("#categoria").val();
    let imagen = $("#imagen").val();
    let descripcion = $("#descripcion").val();
    console.log(nombre, "----", precio, "----", fecha, "----", cantidad, "----", categoria, "----", imagen, "----", descripcion);

    this.producto=new Producto(descripcion,categoria,precio,cantidad,"","","",nombre,fechaV);
    this.listaProducto.push(this.producto);
  }

  guardarRuta() {
    $('input[type=file]').change(function () {
      console.log(this.files[0].mozFullPath);
      this.ruta = $("#imagen").val().split(" ")[0];
    });
  }

  seleccionImagen(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) { 
      this.file = <File>event.target.files[0];
      this.ruta=this.file.name;
      console.log(this.file,"--------")
      
      $("#imagen").removeClass("is-invalid");
      $("#imagen").addClass("is-valid");      
      //ver imagen
    }
  }
  valido(id){
    let form = document.getElementById(id);
    form.addEventListener("blur", function (event) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      if (value.length <= 4) {
        $("#" + id).removeClass("is-valid");
        $("#" + id).addClass("is-invalid");
         $("#" + id + "1").css('display', 'block');
      } else {
        if (value.length > 4) {
          $("#" + id).removeClass("is-invalid");
          $("#" + id).addClass("is-valid");
          $("#" + id + "1").css('display', 'none');
        }
      }
    }, true);
  }
  validoS(id){
      $("#"+id).addClass("is-valid");
  }

  eliminarProducto(producto:Producto){

  }
  setFecha(){

  }

  registrarProducto(){
  }
}