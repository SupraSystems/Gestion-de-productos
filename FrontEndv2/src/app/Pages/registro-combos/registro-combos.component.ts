import { Component, OnInit } from '@angular/core';
import { RegistroDescuentosComponent } from '../registro-descuentos/registro-descuentos.component';
import { Producto } from '../../Models/Producto';
import { Combo } from '../../models/Combo';

import { Validacion } from '../validacion'
import { ServicesService } from "../../services/services.service";
import { Router } from '@angular/router';


declare var tata: any;
declare var $: any;
declare var Swal: any;


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;

}
@Component({
  selector: 'app-registro-combos',
  templateUrl: './registro-combos.component.html',
  styleUrls: ['./registro-combos.component.css']
})

export class RegistroCombosComponent implements OnInit {
  min: Date;
  max: Date;
  fechasAcumuladas: number = 0;
  ruta = "";
  producto: Producto = new Producto("", "", 0, 0, "", "", "", "");
  file: File;
  srcImagen = "https://productos-backend.herokuapp.com/uploads/";
  listaTodosPr: Producto[] = [];
  listaProductoRegistrado: Producto[] = []
  listaProductosEnCombo: Producto[] = []
  contadorDeProductos:number=0;
  validador: Validacion = new Validacion()
  cantidadTotal:number=0;
  precioTotal:number=0;
  combo:Combo=new Combo("", "", 0, 0, "", "","","",[]);
  listaCombos:Combo[]=[];
  imagenC: string | ArrayBuffer;

  mensaje = "";
  constructor(public productsService: ServicesService) {
    const dia = new Date().getDate();
    const mes = new Date().getMonth();
    const anio = new Date().getFullYear();
    this.max = new Date((anio + 5), mes, dia);
    this.min = new Date(anio, mes, dia);
  }

  ngOnInit(): void {
    this.valido('nombre', 'text', 30, 3);
    this.valido('precio', 'number', 4, 1);
    this.valido('descripcion', 'text', 100, 15);
    this.valido('fechaV', '', 0, 0);
    this.getProductos();
    if(this.contadorDeProductos == 0){
        this.desabilitar();
     }
  }
  aniadirACombo(producto: Producto) {
    this.listaProductosEnCombo.push(producto)
    this.listaProductosEnCombo = this.listaProductosEnCombo.reverse()
    this.toastExitoso("Se añadio el producto " + producto.getNombre() + " al combo")
    this.setFechaMenor(producto.getFecha());
    this.contadorDeProductos+=1;
    if(this.contadorDeProductos>1){
       this.habilitar()
    }
    this.cantidadTotal+=1;
    this.precioTotal+=producto.getPrecio();
  }

  borrarProductosDelCombo() {
    if (this.listaProductosEnCombo.length > 0) {
      this.listaProductosEnCombo = [];
      this.toastBorrado("Borrado", "Se borraron todos los productos de su combo");
      this.precioTotal=0;
      this.cantidadTotal=0;
    } else {
      this.toastBorrado("Error", "Su combo no tiene productos para ser borrados");
    }
  }

  borrarProductoDelCombo(indice: number) {
    let listaAux: Producto[] = [];
    let nombre = "";
    for (let i = 0; i < this.listaProductosEnCombo.length; i++) {
      if (indice != i) {
        listaAux.push(this.listaProductosEnCombo[i]);
      } else {
        this.precioTotal-=this.listaProductosEnCombo[i].getPrecio();
        this.cantidadTotal-=1;
        nombre = this.listaProductosEnCombo[i].getNombre();
      }
    }
    this.listaProductosEnCombo = listaAux;
    this.toastBorrado("Borrado", "se borro el producto " + nombre + " del combo");
  }

//filtramos los productos 
  categorizar() {
    let categoria = $("#categoria").val();
    this.listaProductoRegistrado = [];
    if (categoria != "todos") {
      for (let i = 0; i < this.listaTodosPr.length; i++) {
        if (this.listaTodosPr[i].getTipo() == categoria) {
          this.listaProductoRegistrado.push(this.listaTodosPr[i])
        }
      }
    } else {
      this.listaProductoRegistrado = this.listaTodosPr;
    }
  }

  //obtenemos los productos de la base de datos y los cargamos a una lista local
  getProductos() {
    this.productsService.getProducts().subscribe(
      res => {
        this.productsService.listaproductos = res;
        console.log(this.productsService.listaproductos, "--")
        for (let i = 0; i < this.productsService.listaproductos.length; i++) {
          let nombre = this.productsService.listaproductos[i].nombre;
          let precio = this.productsService.listaproductos[i].precio;
          let cantidad = this.productsService.listaproductos[i].cantidad;
          let descripcion = this.productsService.listaproductos[i].descripcion;
          let fechavencimiento = this.productsService.listaproductos[i].fechavencimiento;
          let tipo = this.productsService.listaproductos[i].tipo;
          let imagen = this.srcImagen + this.productsService.listaproductos[i].imagePath.substring(8);
          let id = this.productsService.listaproductos[i]._id;
          this.producto = new Producto(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, fechavencimiento,)
          this.listaProductoRegistrado.push(this.producto);
        }
        this.listaTodosPr = this.listaProductoRegistrado;
        console.log(this.listaProductoRegistrado, "+++++--")

      },
      err => console.log(err)
    )
  }

  //guardamos la informacion de un producto para mostrarlo en el modal
  setActualizarProducto(producto: Producto) {
    this.producto = producto;
  }

  setActualizarCombo(combo: Combo) {
    this.combo = combo;
  }
  toastExitoso(msj: string): void {
    tata.success('Exito', msj, {
      duration: 5000,
      animate: 'slide'
    });
  }
  toastBorrado(titulo: string, msj: string) {
    tata.error(titulo, msj, {
      duration: 5000,
      animate: 'slide'
    });
  }

  //escogemos de los productos del combo la fecha menor para el vencimiento del combo
  setFechaMenor(fecha: string) {
    if (fecha != "") {
      let res = fecha.split("/")
      let dia = parseInt(res[1]);
      let mes = parseInt(res[0]) - 1;
      let anio = parseInt(res[2]);
      let fechaMinP = new Date(anio, mes, (dia-1));
      if(this.fechasAcumuladas==0){
        this.max = fechaMinP;
        this.fechasAcumuladas+=1;
      }else{
        if (fechaMinP > this.max) {
          this.max = fechaMinP;
        }
      }
    }
  }








// registramos el combo que creo a una lista
  enlistarCombo() {
    if (this.camposValidos()) {
      if(this.listaProductosEnCombo.length<6){
        if(this.listaProductosEnCombo.length>1){
          let nombre = $("#nombre").val();
          let precio = $("#precio").val();
          let fechaV = $('#fechaV').val();
          let fecha = new Date()
          let cantidad =this.cantidadTotal;
          let categoria = $("#categoria").val();
          let imagen = this.imagenC;
          let descripcion = $("#descripcion").val();
 
          this.combo = new Combo(descripcion, categoria, precio, cantidad, imagen, "", "", nombre,this.listaProductosEnCombo, fechaV, this.file);
          this.listaCombos.push(this.combo);
          this.limpiarRegistros();
          this.toastExito();
          this.listaProductosEnCombo=[];
          this.desabilitar()
          this.contadorDeProductos= 0
          this.fechasAcumuladas=0;
          $("#registrar").attr("disabled",false);
          $("#vaciar").attr("disabled",false);
        } else {
          this.toastError2();
        }
      } else{
        this.toastError1();
      }
      
    } else {
      this.toastError();
    }
  }

  desabilitar(){
    $("#nombre").attr("disabled",true);
    $("#precio").attr("disabled",true);
    $("#fechaIc").attr("disabled",true);
    $("#imagen").attr("disabled",true);
    $("#descripcion").attr("disabled",true);
    $("#enlistar").attr("disabled",true);
    if(this,this.listaCombos.length==0){
      $("#registrar").attr("disabled",true);
      $("#vaciar").attr("disabled",true);
    }
  }
  habilitar(){
    $("#nombre").attr("disabled",false);
    $("#precio").attr("disabled",false);
    $("#fechaIc").attr("disabled",false);
    $("#imagen").attr("disabled",false);
    $("#descripcion").attr("disabled",false);
    $("#enlistar").attr("disabled",false);
    if(this,this.listaCombos.length > 0){
      $("#registrar").attr("disabled",false);
      $("#vaciar").attr("disabled",false);
    }
  }

//guardamos la imagen que selecciono
  seleccionImagen(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.ruta = this.file.name;
      //console.log(this.ruta.split("."),"+++++++++++++++++++++++++++++++++++++++");
      let temp = this.ruta.split(".")[1].toLocaleLowerCase();
      //console.log(temp,"^^^^^^^^^^^^^^^^^^^^^^^^^")
      if (temp == "jpg" || temp == "png" || temp == "jpeg") {
        $("#imagen").removeClass("is-invalid");
        $("#imagen").addClass("is-valid");
        $("#imagen1").css('display', 'none');
      
        const reader = new FileReader();
        reader.onload = e => this.imagenC=reader.result;
        reader.readAsDataURL(this.file)
      } else {
        $("#imagen").removeClass("is-valid");
        $("#imagen").addClass("is-invalid");
        $("#imagen1").css('display', 'block');
      }
      //console.log(this.file, "--------")
    }
  }

  //validamos el ingreso de datos en los campos del formulario
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
    let res1 = this.validador.verificacionValidos("precio", 'precio');
    let res2 = this.validador.verificacionValidos("nombre", 'nombre');
    let res3 = this.validador.verificacionValidos("descripcion", 'descripcion');
    let res4 = this.validador.verificacionValidos("fechaV", 'fecha de vencimiento');
    let res5 = this.validador.verificacionValidos("imagen", 'registro imagen');
    if (res1 && res2 && res3 && res4 && res5) {
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
  toastError1(): void {
    tata.error('Error', 'La cantidad de productos seleccionados excede el limite permitido', {
      duration: 4000,
      animate: 'slide'
    });
  }
  toastError2(): void {
    tata.error('Error', 'La cantidad de productos seleccionados debe ser mayor a 1', {
      duration: 4000,
      animate: 'slide'
    });
  }

  toastEliminacion(): void {
    tata.error('Eliminacion', 'se elimino  un producto de la lista de registro', {
      duration: 4000,
      animate: 'slide'
    });
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
    $("#fechaV").removeClass("is-invalid");
    $("#fechaV").addClass("is-valid");
    $("#fechaV1").css('display', 'none');

  }

  registrarCombos() {
    for (let i = 0; i < this.listaCombos.length; i++) {
      this.productsService.addCombo(this.listaCombos[i]).subscribe(res => console.log(res), err => console.log(err));
    console.log(this.listaCombos[i],"-------")
    //console.log(this.listaCombos[i].getListaProducto()[2].getId());
    //console.log(this.listaCombos[i].getListaProducto().length);
    }
  }

  limpiarRegistros() {
    this.validador.limpiarRegistros('nombre');
    this.validador.limpiarRegistros('precio');
    this.validador.limpiarRegistros('fechaV');
    this.validador.limpiarRegistros('descripcion');
    this.validador.limpiarRegistros('imagen');
    $("#categoria").removeClass("is-valid").removeClass("is-invalid");
    this.ruta = "";
    this.cantidadTotal=0;
    this.precioTotal=0;
  }

  limpiarFomulario() {
    this.limpiarRegistros();
    this.listaCombos = [];
    this.listaProductosEnCombo=[];
    this.contadorDeProductos= 0
  }

  borrarElemento(indice: number) {
    let listaAux: Combo[] = [];
    for (let i = 0; i < this.listaCombos.length; i++) {
      if (indice != i) {
        listaAux.push(this.listaCombos[i]);
      }
    }
    this.listaCombos = listaAux;
    this.toastEliminacion();
    if(this,this.listaCombos.length > 0){
      $("#registrar").attr("disabled",false);
      $("#vaciar").attr("disabled",false);
    }else{
      $("#registrar").attr("disabled",true);
      $("#vaciar").attr("disabled",true);
    }
  }

// mostramos un mensaje de alerta al registrar los combos
  alertRegistrar(): void {
    if (this.listaCombos.length > 0) {
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
          this.registrarCombos();
          Swal.fire(
            '!Registro Existoso!',
            'Sus Productos Fueron Registrados',
            'success'
          )
        }
      })
    } else {
      tata.error('Error', "no tiene productos listados", {
        duration: 3000,
        animate: 'slide'
      });
    }
  }
}