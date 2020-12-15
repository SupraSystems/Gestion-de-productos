import { Component, OnInit } from '@angular/core';
import { Producto } from '../../Models/Producto';
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
  selector: 'app-registro-descuentos',
  templateUrl: './registro-descuentos.component.html',
  styleUrls: ['./registro-descuentos.component.css']
})
export class RegistroDescuentosComponent implements OnInit {
  ruta = "";
  producto: Producto = new Producto("", "", 0, 0, "", "", "", "");
  productoSeleccionado: Producto = new Producto("", "", 0, 0, "", "", "", "");
  file: File;
  srcImagen = "https://productos-backend.herokuapp.com/uploads/";
  listaTodosProducts: Producto[] = [];
  listaProductosRegistrados: Producto[] = []
  validador: Validacion = new Validacion()
  imagenC: string | ArrayBuffer;
  cantidadTotal = 5;
  nombreProductoS = "";
  mensaje = "";
  precioActual: number = 0;
  precioDescuento: number = 0;
  porcentajeDescuento: number = 0;
  listaProductosRD: Producto[] = [];
  banderaDescuento = false;
  valido= new Validacion();
  productoDesc: Producto = new Producto("", "", 0, 0, "", "", "", "");


  constructor(public productsService: ServicesService) {
  }

  ngOnInit(): void {
    this.valido.validoNumber('precioDescuentoN', 2, 1);
    this.getProductosBD();
  }

  aniadirDescuento(producto: Producto) {
    this.precioActual = producto.getPrecio();
    this.precioDescuento = 0;
    this.porcentajeDescuento = 0;
    this.nombreProductoS = producto.getNombre();
    this.productoSeleccionado = producto;
    this.banderaDescuento = true;
    $("#precioDescuentoN").off();
    this.valido.validoNumber('precioDescuentoN', 2, 1);

  }

  //filtramos los productos segun nos convenga
  categorizar() {
    let categoria = $("#categoria").val();
    this.listaProductosRegistrados = [];
    if (categoria != "todos") {
      for (let i = 0; i < this.listaTodosProducts.length; i++) {
        if (this.listaTodosProducts[i].getTipo() == categoria) {
          this.listaProductosRegistrados.push(this.listaTodosProducts[i])
        }
      }
    } else {
      this.listaProductosRegistrados = this.listaTodosProducts;
    }
  }

  //obtenemos los productos de la base de datos y los cargamos a una lista local
  getProductosBD() {
    this.productsService.getProducts().subscribe(
      res => {
        this.productsService.listaproductos = res;
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
          this.listaProductosRegistrados.push(this.producto);
        }
        this.listaTodosProducts = this.listaProductosRegistrados;
      },
      err => console.log(err)
    )
  }

  //guardamos la informacion de un producto para mostrarlo en el modal
  setActualizarProducto(producto: Producto) {
    this.producto = producto;
  }



  toastExitoso(msj: string): void {
    tata.success('Exito', msj, {
      duration: 4000,
      animate: 'slide'
    });
  }
  toastError(msj: string): void {
    tata.error('Error', msj, {
      duration: 4000,
      animate: 'slide'
    });
    this.validador.setMensaje();
  }
  borrarElemento(indice: number) {
    this.toastBorrado("Producto con descuento Borrado")
    let listaAux: Producto[] = [];
    for (let i = 0; i < this.listaProductosRD.length; i++) {
      if (indice != i) {
        listaAux.push(this.listaProductosRD[i]);
      }
      this.listaProductosRD = listaAux;
    }
  }


  toastBorrado(msj: string) {
    tata.error("Borrado", msj, {
      duration: 5000,
      animate: 'slide'
    });
  }

  enlistarDescuento() {
    if(this.precioDescuento!=0){
    if ($("#precioDescuentoN").val() != "" && this.banderaDescuento) {
      let descuento=parseInt($("#precioDescuentoN").val());
      if(descuento > 4 && descuento< 76 ){
        this.toastExitoso("Descuento Enlistado")
        this.productoSeleccionado.setDescuento(descuento);
        this.productoSeleccionado.setPrecio(this.precioDescuento);
        this.listaProductosRD.push(this.productoSeleccionado)
        $("#precioDescuentoN").val("");
        this.validador.limpiarRegistros("precioDescuentoN");
        this.precioActual = 0;
        this.precioDescuento = 0;
        this.banderaDescuento = false;
        console.log(this.listaProductosRD);
      }else{
        this.toastError("Porcentaje Ingresado Invalido")
      }
    } else {
      this.toastError("Porcentaje Ingresado Invalido")
    }
  }else{
    this.toastError("Debe verificar el precio de descuento")
  }
  }


  // registramos el combo que creo a una lista
  /*
  enlistarDescuento() {
    if(this.precioDescuento!=0){
    if ($("#precioDescuentoN").val() != "" && this.banderaDescuento) {
      let descuento=parseInt($("#precioDescuentoN").val());
      if(descuento > 4 && descuento< 76 ){
        this.toastExitoso("Descuento Enlistado")
        this.productoSeleccionado.setDescuento(this.precioDescuento);
        this.listaProductosRD.push(this.productoSeleccionado)
        $("#precioDescuentoN").val("");
        this.validador.limpiarRegistros("precioDescuentoN");
        this.precioActual = 0;
        this.precioDescuento = 0;
        this.banderaDescuento = false;
        console.log(this.listaProductosRD);
      }else{
        this.toastError("Porcentaje Ingresado Invalido")
      }
    } else {
      this.toastError("Porcentaje Ingresado Invalido")
    }
  }else{
    this.toastError("Debe verificar el precio de descuento")
  }
  }
*/
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
        reader.onload = e => this.imagenC = reader.result;
        reader.readAsDataURL(this.file)
      } else {
        $("#imagen").removeClass("is-valid");
        $("#imagen").addClass("is-invalid");
        $("#imagen1").css('display', 'block');
      }
      //console.log(this.file, "--------")
    }
  }

  //registro de productos con descuentos
  registrarDescuentos() {
    for (let i = 0; i < this.listaProductosRD.length; i++) {
      this.productsService.addDescuento(this.listaProductosRD[i]).subscribe(res => console.log(res), err => console.log(err));
    }
  }

  borrarListaDescuento() {
    this.toastBorrado("Lista De Descuentos Borrados");
    this.listaProductosRD = [];
  }



  // mostramos un mensaje de alerta al registrar los combos
  alertRegistrar(): void {
    if (this.listaProductosRegistrados.length > 0) {
      Swal.fire({
        title: 'Confirmar',
        text: "Esta Seguro De Registrar Los Descuentos Listados?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.registrarDescuentos();
          this.listaProductosRD = [];
          Swal.fire(
            '!Registro Existoso!',
            'Sus Descuentos Fueron Registrados',
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

  validoS(id) {
    $("#" + id).addClass("is-valid");
  }

  descontarPrecio(){
    if(this.precioActual!=0){
      if($("#precioDescuentoN").hasClass("is-valid")){
        let aux=this.precioActual/100;//0.15
        let descuento=$("#precioDescuentoN").val()*aux;//1.05
        this.precioDescuento=this.precioActual-descuento;
        this.toastExitoso("Se calculo el precio de descuento del producto")
      } else{
        this.toastError("Debe ingresar un porcentaje de descuento");
      }
    }
    else{
      this.toastError("Debe seleccioinar un producto");
    }
  }


  registrarDeceuntos(){
    for (let i = 0; i < this.listaProductosRD.length; i++) {
      console.log(this.listaProductosRD[i],"---------")
      
    }
  }
  setActualizarProductoDesc(producto:Producto){
    this.productoDesc=producto

  }
}