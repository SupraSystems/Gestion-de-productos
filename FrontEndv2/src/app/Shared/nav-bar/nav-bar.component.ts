import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { Router } from '@angular/router';
import { ServicesService } from "../../services/services.service";
import { BuscadorService } from 'src/app/services/buscador.service';

declare var $: any;
declare var tata: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  usuario = "Pepe";
  seRegistro = false;

  @Output() buscarProducto = new EventEmitter();
  listaProductos: Producto[] = [];
  producto: Producto = new Producto("", "", 0, 0, "", "", "", "");
  URLactual = "";
  buscarNombre = "";
  palabraBuscada = "";

  listaProductosTemp: Producto[] = [];


  constructor(private router: Router, public productsService: ServicesService, servicio: BuscadorService) {

  }
  ngOnInit(): void {
    this.getProductos();
    this.precionar_amburguesa()
  }

  //----------------------------------------
  dbuscar() {
    this.buscarNombre = $("#nombreProducto").val();
    let URLactual = window.location.href;
    let res = URLactual.split("/");
    let temp = res[res.length - 1];
    if (this.buscarNombre == "") {
      this.precionar_amburguesa();
      this.toastError("Debe ingresar Un Nombre De Producto");
    } else {
      if (temp == "home") {
        console.log("estamos en el carrosel XDXDXD")
        let flag = false;
        for (let i = 0; i < this.listaProductos.length; i++) {
          if (!flag) {
            flag = this.nombresCoincidentes(this.listaProductos[i].getNombre())
          }else{
            this.listaProductosTemp.push(this.listaProductos[i])
          }
        }
        if (flag) {
          localStorage.setItem('buscador',this.buscarNombre);
          this.router.navigate(['/todos_los_productos']);
          //this.buscarProducto.emit({palabra:this.buscarNombre, ruta:"todos_los_productos"});
        } else {
          this.toastError("no se encontraron productos coincidentes");
        }
      } // si no se encuentra en la ruta del home
      else{
      this.buscarProducto.emit({palabra:this.buscarNombre, ruta:temp});
      }
      this.precionar_amburguesa();
    }
  }

  toastError(msj: string): void {
    tata.error('Error', msj, {
      duration: 8000,
      animate: 'slide'
    });
  }

  nombresCoincidentes(nombre: string): boolean {
    let flag = false;
    let nombres: string[] = nombre.split(" ");
    let nombreBuscado: string[] = this.buscarNombre.split(" ");
    //si el nombre es una palabra
    console.log(nombres[0].toLowerCase(), "################", nombreBuscado[0].toLowerCase())
    if (nombres.length == 1) {
      if (nombreBuscado.length == 1) {
        if (nombres[0].toLowerCase() == nombreBuscado[0].toLowerCase()) {
          flag = true;
        }
      } else {
        for (let k = 0; k < nombreBuscado.length; k++) {
          if (nombres[0].toLowerCase() == nombreBuscado[k].toLowerCase()) {
            flag = true;
          }
        }
      }
    } else {//si el nombre continen mas de dos palabras
      if (nombreBuscado.length == 1) {
        for (let j = 0; j < nombres.length; j++) {
          if (nombres[j].toLowerCase() == nombreBuscado[0].toLowerCase()) {
            flag = true;
          }
        }
      } else {
        for (let m = 0; m < nombres.length; m++) {
          for (let n = 0; n < nombreBuscado.length; n++) {
            if (nombres[m].toLowerCase() == nombreBuscado[n].toLowerCase()) {
              flag = true;
            }
          }
        }
      }
    }
    return flag;
  }

  getProductos() {
    this.productsService.getProducts().subscribe(
      res => {
        this.productsService.listaproductos = res;


        /*-----------***************************************************-------------------------*/
        console.log(this.productsService.listaproductos, "--")
        for (let i = 0; i < this.productsService.listaproductos.length; i++) {
          let nombre = this.productsService.listaproductos[i].nombre;
          let precio = this.productsService.listaproductos[i].precio;
          let cantidad = this.productsService.listaproductos[i].cantidad;
          let descripcion = this.productsService.listaproductos[i].descripcion;
          let fechavencimiento = this.productsService.listaproductos[i].fechavencimiento;
          let tipo = this.productsService.listaproductos[i].tipo;
          let imagen = "";
          let id = this.productsService.listaproductos[i]._id;
          this.producto = new Producto(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, fechavencimiento,)
          this.listaProductos.push(this.producto);
        }
        /*-------------------------------------------------------*/

      },
      err => console.log(err)
    )
  }


  //------------------------------------------
  precionar_amburguesa() {
    if ($("#amburguesa").attr('aria-expanded') === "true") {
      $("#amburguesa").click();
    }
  }

  getUsuarioSesion() {
    return true;
  }

  cerrarSesion() {
    if (this.seRegistro) {
      this.seRegistro = false;
    }
  }
  inciarSesion() {
    if (!this.seRegistro) {
      this.seRegistro = true;
    }
  }
}

