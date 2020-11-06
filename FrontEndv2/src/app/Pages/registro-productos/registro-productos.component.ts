import { Component, OnInit } from '@angular/core';
import { RegistroDescuentosComponent } from '../registro-descuentos/registro-descuentos.component';
import { Producto } from '../../Models/Producto';
import { Validacion } from '../validacion'
import { ServicesService } from "../../services/services.service";
declare var tata: any;
declare var $: any;
declare var Swal: any;


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;

}

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
  validador: Validacion = new Validacion()

  constructor(public productsService: ServicesService) {
    const dia = new Date().getDate();
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.min = new Date(anio, mes, dia);
  }

  ngOnInit(): void {
    this.valido('nombre', 'text', 30, 3);
    this.valido('precio', 'number', 4, 1);
    this.valido('cantidad', 'number', 2, 1);
    this.valido('descripcion', 'text',100, 15);
    this.valido('fechaV', '', 0, 0);
  }

  enlistar() {
    if (this.camposValidos()) {
      let nombre = $("#nombre").val();
      let precio = $("#precio").val();
      let fechaV = $('#fechaV').val();

      console.log(fechaV, "------------------")
      let fecha = new Date()
      let cantidad = $("#cantidad").val();
      let categoria = $("#categoria").val();
      let imagen = $("#imagen").val();
      let descripcion = $("#descripcion").val();

      this.producto = new Producto(descripcion, categoria, precio, cantidad, "", "", "", nombre, fechaV, this.file);
      this.listaProducto.push(this.producto);
      this.limpiarRegistros();
      this.toastExito();
    } else {
      this.toastError();
    }
  }

  seleccionImagen(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.ruta = this.file.name;
      //console.log(this.ruta.split("."),"+++++++++++++++++++++++++++++++++++++++");
      let temp=this.ruta.split(".")[1].toLocaleLowerCase();
      //console.log(temp,"^^^^^^^^^^^^^^^^^^^^^^^^^")
      if(temp=="jpg"||temp=="png"||temp=="jpeg"){
        $("#imagen").removeClass("is-invalid");
        $("#imagen").addClass("is-valid");
        $("#imagen1").css('display', 'none');  
      }else{
        $("#imagen").removeClass("is-valid");
        $("#imagen").addClass("is-invalid");
        $("#imagen1").css('display', 'block');  
      }
      //console.log(this.file, "--------")
     
    }
  }

  valido(id, tipo, max, min) {
    switch (tipo) {
      case 'text':
        this.validador.validoText(id, max, min);
        break;
      case 'number':
        this.validador.validoNumber(id, max, min);
        break;
      default: 11
        this.validador.validoFecha("fechaV")
    }
  }

  camposValidos(): Boolean {
    let result = false;
    let res = this.validador.verificacionValidos("cantidad", 'cantidad');
    let res1 = this.validador.verificacionValidos("precio", 'precio');
    let res2 = this.validador.verificacionValidos("nombre", 'nombre');
    let res3 = this.validador.verificacionValidos("descripcion", 'descripcion');
    let res4 = this.validador.verificacionValidos("fechaV", 'fecha de vencimiento');
    let res5 = this.validador.verificacionValidos("imagen", 'registro imagen');
    if (res && res1 && res2 && res3 && res4 && res5) {
      result = true
    }
    this.validoS("categoria")
    return result;
  }

  toastError(): void {
    tata.error('Error', this.validador.getMensaje(), {
      duration: 8000,
      animate: 'slide'
    });
    this.validador.setMensaje();
  }
  toastExito(): void {
    tata.success('Exito', 'Se enlisto la informacion del producto', {
      duration: 8000,
      animate: 'slide'
    });
  }

  validoS(id) {
    $("#" + id).addClass("is-valid");
  }

  setFecha() {
    console.log("ingreso datos a la");
    $("#fechaV").removeClass("is-invalid");
    $("#fechaV").addClass("is-valid");
    $("#fechaV1").css('display', 'none');
  }

  registrarProducto() {
    for (let i = 0; i < this.listaProducto.length; i++) {
      this.productsService.addProduct(this.listaProducto[i]).subscribe(res => console.log(res), err => console.log(err));
    }
  }

  limpiarRegistros() {
    this.validador.limpiarRegistros('nombre');
    this.validador.limpiarRegistros('precio');
    this.validador.limpiarRegistros('fechaV');
    this.validador.limpiarRegistros('cantidad');
    this.validador.limpiarRegistros('descripcion');
    this.validador.limpiarRegistros('imagen');
    $("#categoria").removeClass("is-valid").removeClass("is-invalid");
    this.ruta = "";
  }

  limpiarFomulario() {
    this.limpiarRegistros();
    this.listaProducto = [];
  }

  borrarElemento(indice: number) {
    let listaAux: Producto[] = [];
    for (let i = 0; i < this.listaProducto.length; i++) {
      if (indice != i) {
        listaAux.push(this.listaProducto[i]);
      }
    }
    this.listaProducto = listaAux;
  }


  alertRegistrar(): void {
    if (this.listaProducto.length > 0) {
      Swal.fire({
        title: 'Confirmar',
        text: "Esta Seguro De Registrar Los Produtos Listados?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.registrarProducto();
          Swal.fire(
            '!Registro Existoso!',
            'Sus Productos Fueron Registrados',
            'success'
          )
        }
      })
    }else{
      tata.error('Error', "no tiene productos listados", {
        duration: 3000,
        animate: 'slide'
      });
    }
  }
}