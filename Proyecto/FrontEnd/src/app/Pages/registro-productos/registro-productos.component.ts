import { Component, OnInit } from '@angular/core';
import { RegistroDescuentosComponent } from '../registro-descuentos/registro-descuentos.component';
import { Producto } from '../../Models/Producto';

import { ServicesService } from "../../services/services.service";
declare var tata: any;


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
  producto: Producto = new Producto("", "", 0, 0, "", "", "", "");
  file: File;
  listaProducto: Producto[] = []
  valido1 = false;

  mensaje = "";
  constructor(public productsService: ServicesService) {
    const dia = new Date().getDate();
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.min = new Date(anio, mes, dia);
  }

  ngOnInit(): void {
    this.valido('nombre');
    this.valido('precio');
    this.valido('cantidad');
    this.valido('descripcion');
  }

  enlistar() {
    if (this.camposValidos()) {
      let nombre = $("#nombre").val();
      let precio = $("#precio").val();
      let fechaV = $('#fechaV').val();

      console.log(fechaV, "------------------")
      let fecha = new Date()
      let cantidad = $("#cantidad").val();
      let categoria = $("#categoria").val().toLowerCase().replace(' ', '');
      let imagen = $("#imagen").val();
      let descripcion = $("#descripcion").val();

      this.producto = new Producto(descripcion, categoria, precio, cantidad, "", "", "", nombre, fechaV, this.file);
      this.listaProducto.push(this.producto);
    } else {
      this.toastError();
    }
  }

  seleccionImagen(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.ruta = this.file.name;
      console.log(this.file, "--------")
      $("#imagen").removeClass("is-invalid");
      $("#imagen").addClass("is-valid");
    }
  }
  valido(id) {
    let form = document.getElementById(id);
    form.addEventListener("blur", function (event) {
      let value = (<HTMLInputElement>document.getElementById(id)).value;
      let tamanio = 1;
      switch (id) {
        case 'nombre':
          tamanio = 3;
          break;
        case 'precio':
          tamanio = 4;
          break;
        case 'cantidad':
          tamanio = 2;
          break;
        case 'descripcion':
          tamanio = 15;
          break;
        default:
          console.log("no se pudo validar");
      }
      if (id == "descripcion" || id == "nombre") {
        if (value.length < tamanio) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "1").css('display', 'block');
        } else {
          if (value.length >= tamanio) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "1").css('display', 'none');
          }
        }
      } else {
        if (value.length > tamanio || value.length == 0) {
          $("#" + id).removeClass("is-valid");
          $("#" + id).addClass("is-invalid");
          $("#" + id + "1").css('display', 'block');
        } else {
          if (value.length <= tamanio && value.length > 0) {
            $("#" + id).removeClass("is-invalid");
            $("#" + id).addClass("is-valid");
            $("#" + id + "1").css('display', 'none');
          }
        }
      }
    }, true);
  }
  camposValidos(): Boolean {
    let res = true;
    let nombre = $("#nombre").val();
    let precio = $("#precio").val();
    let fechaV = $('#fechaV').val();
    let cantidad = $("#cantidad").val();
    let imagen = $("#imagen").val();
    let descripcion = $("#descripcion").val();

    if (nombre.length == 0 || nombre.length < 3) {
      $("#nombre").addClass("is-invalid");
      $("#nombre1").css('display', 'block');
      this.mensaje += 'debe llenar el campo de nombre <br>'

      res = false;
    } if (precio.length == 0 || precio.length > 4) {
      $("#precio").addClass("is-invalid");
      $("#precio1").css('display', 'block');
      this.mensaje += 'debe llenar el campo de precio <br>'
      res = false;
    } if (cantidad.length == 0 || cantidad.length > 2) {
      $("#cantidad").addClass("is-invalid");
      $("#cantidad1").css('display', 'block');
      this.mensaje += 'debe llenar el campo de cantidad <br>'
      res = false;
    } if (descripcion.length == 0 || descripcion.length < 15) {
      $("#descripcion").addClass("is-invalid");
      $("#descripcion1").css('display', 'block');
      this.mensaje += 'debe llenar el campo de descripcion<br>'
      res = false;
    } if (fechaV == "") {
      $("#fechaV").addClass("is-invalid");
      $("#fechaV1").css('display', 'block');
      this.mensaje += 'debe llenar el campo de fecha de vencimiento<br>'
      res = false;
    }else{
        $("#fechaV").addClass("is-valid");
        $("#fechaV").removeClass("is-invalid");
        $("#fechaV1").css('display', 'none');
    }
    return res;
  }

  toastError(): void {
    tata.error('error', this.mensaje, {
      duration: 6000,
      animate: 'slide'
    });
    this.mensaje = ""
  }



  validoS(id) {
    $("#" + id).addClass("is-valid");
  }

  eliminarProducto(producto: Producto) {

  }
  setFecha() {

  }

  registrarProducto(): Boolean {
    for (let i = 0; i < this.listaProducto.length; i++) {
      this.productsService.addProduct(this.listaProducto[i]).subscribe(res => console.log(res), err => console.log(err));
    }
    return false;
  }

  limpiarRegistros() {
    let res = $("#descripcion").val();
    console.log(res, "________________________________")
  }
}