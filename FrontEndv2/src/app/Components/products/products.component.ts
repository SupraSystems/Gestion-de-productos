import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { Router } from '@angular/router';
import { ServicesService } from "../../services/services.service";
import { BuscadorService } from 'src/app/services/buscador.service';
declare var $: any;
declare var tata: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listaDeProductos: Producto[] = [];
  producto: Producto = new Producto("", "", 0, 0, "", "", "", "");
  titulo = "";
  ruta = "";
  descripcion = "";
  tipoProducto = "";




  /*-------------------------------*/
  srcImagen = "https://productos-backend.herokuapp.com/uploads/";
  listaDesordenada: Producto[] = [];
  listaTodosPr: Producto[] = [];
  listaOrdenadaAZ: Producto[] = [];
  listaOrdenadaZA: Producto[] = [];
  listaOrdenadaDescendente: Producto[] = [];
  listaOrdenadaAscendente: Producto[] = [];
  /*----------------------------------*/


  URLactual = "";
  buscarNombre = "";
  palabraBuscada = "";
  @Output() mostrarMensaje = new EventEmitter();


  constructor(private router: Router, public productsService: ServicesService, public servicio: BuscadorService) {

  }

  ngOnInit(): void {
    this.productsService.listaproductos = [];
    this.titulo = localStorage.getItem('titulo');
    this.tipoProducto = localStorage.getItem("tipo_producto");
    this.servicio.$emitter.subscribe(x => this.actualizarBuscador(x),
      err => console.error('Eroor de mensaje: ' + err),
      () => console.log('Ocurrio un problems')
    );
    if (this.tipoProducto == "para_farmacia") {
      this.getCategoria("Para Farmacia");
    } else {
      if (this.tipoProducto == "bebidas") {
        this.getCategoria("Bebidas");
      } else {
        if (this.tipoProducto == "bebe") {
          this.getCategoria("Bebe");
        } else {
          if (this.tipoProducto == "mascotas") {
            this.getCategoria("Mascotas");
          } else {
            if (this.tipoProducto == "higiene_y_belleza") {
              this.getCategoria("Higiene y Belleza");
            } else {
              if (this.tipoProducto == "basicos_del_hogar") {
                this.getCategoria("Basicos del hogar");
              } else {
                if (this.tipoProducto == "frescos") {
                  this.getCategoria("Frescos");
                } else {
                  if (this.tipoProducto == "alimentos") {
                    this.getCategoria("Alimentos");
                  } else {
                    if (this.tipoProducto == "todos_los_productos") {
                      this.getProductos();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (localStorage.getItem('buscador') != "" && this.tipoProducto == "todos_los_productos") {
      let aux = { palabra: localStorage.getItem('buscador'), ruta: "todos_los_productos" }
      this.actualizarBuscador(aux);
      localStorage.setItem('buscador', "")
    }
  }

  cambiar() {
    console.log("resionooooooooooooooo!", $("#inputs").val())
    localStorage.setItem('aux', $("#inputs").val());
  }

  actualizarBuscador(msj) {
    console.log("//////////////////////", msj.palabra, "///", msj.ruta, "////////////")
    console.log(this.listaTodosPr[0], "---------------------")
    this.buscarNombre = msj;
    console.log(this.tipoProducto, "-----------------", msj.ruta)
    this.tipoProducto = localStorage.getItem("tipo_producto");
    this.buscarNombre = msj.palabra
    this.URLactual = msj.ruta;
    if (this.tipoProducto == msj.ruta) {
      console.log("estamos en los productos")
      let flag = false;
      for (let i = 0; i < this.listaTodosPr.length; i++) {
        if (!flag) {
          flag = this.nombresCoincidentes(this.listaTodosPr[i].getNombre())
        }
      }
      if (flag) {
        this.mostrarMensaje.emit({ tipo: "exito", ruta: msj.ruta });
      } else {
        if (localStorage.getItem('buscador') != "") {
          this.mostrarMensaje.emit({ tipo: "exito", ruta: msj.ruta });
          localStorage.setItem('buscador', "")
        } else {
          this.mostrarMensaje.emit({ tipo: "error", ruta: msj.ruta });
        }
      }
    }
  }

  nombresCoincidentes(nombre: string): boolean {
    let flag = false;
    if (this.buscarNombre != "") {
      let nombres: string[] = nombre.split(" ");
      let nombreBuscado: string[] = this.buscarNombre.split(" ");
      //si el nombre es una palabra
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
    } else {
      flag = true;
    }

    return flag;
  }

  ListarTodos() {
    this.buscarNombre = "";
  }

  getCategoria(categoria: string) {
    this.productsService.getProductsCategoria(categoria).subscribe(
      res => {
        this.productsService.listaproductos = res;
        /*----------*****************************************--------------------------*/
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
          this.listaDesordenada.push(this.producto);
        }
        this.listaTodosPr = this.listaDesordenada.slice();

        this.listaOrdenadaAZ = this.listaTodosPr;
        this.listaOrdenadaZA = this.listaTodosPr;
        this.listaOrdenadaDescendente = this.listaTodosPr;
        this.listaOrdenadaAscendente = this.listaTodosPr;
        /*-------------------------------------------------------*/
      },
      err => console.log(err)
    )
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
          let imagen = this.srcImagen + this.productsService.listaproductos[i].imagePath.substring(8);
          let id = this.productsService.listaproductos[i]._id;
          this.producto = new Producto(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, fechavencimiento,)
          this.listaDesordenada.push(this.producto);
        }
        this.listaTodosPr = this.listaDesordenada.slice();

        this.listaOrdenadaAZ = this.listaTodosPr;
        this.listaOrdenadaZA = this.listaTodosPr;
        this.listaOrdenadaDescendente = this.listaTodosPr;
        this.listaOrdenadaAscendente = this.listaTodosPr;
        /*-------------------------------------------------------*/

      },
      err => console.log(err)
    )
  }

  /*----------****************************************-----------------------------------------------*/

  ordenar() {
    console.log("ingreso a ordenar!!!!!!!!!!!!!")
    let categoria = $("#orden").val();
    if (categoria == "Precio Ascendente") {
      console.log("ingreso a ordenar ascendentemente !!!!!!!!!!!!!")
      this.listaTodosPr = this.enlistarPrecioMN();;
    } else {
      if (categoria == "Precio Descendente") {
        this.listaTodosPr = this.enlistarPrecioNM();;
      } else {
        if (categoria == "Alfabeticamente Z-A") {
          this.listaTodosPr = this.enlistarAlfabeticamenteZA();;
        } else {
          if (categoria == "Alfabeticamente A-Z") {
            this.listaTodosPr = this.enlistarAlfabeticamenteAZ();;
          }
          else {
            if (categoria == "Desordenado") {
              console.log("ingreso a ordenar desordendo !!!!!!!!!!!!")
              this.listaTodosPr = this.listaDesordenada;;
            }
          }
        }
      }
    }
  }

  enlistarAlfabeticamenteAZ() {
    let ini;
    for (let i = 1; i < this.listaOrdenadaAZ.length; i++) {
      let aux: Producto = this.listaOrdenadaAZ[i];
      ini = i;    //inicia el desplazamiento en i

      while (ini > 0 && (this.listaOrdenadaAZ[ini - 1].getNombre().localeCompare(aux.getNombre())) > 0) {
        this.listaOrdenadaAZ[ini] = this.listaOrdenadaAZ[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaAZ[ini] = aux;    //inserta elemento
    }
    return this.listaOrdenadaAZ;
  }

  enlistarAlfabeticamenteZA() {
    let ini;

    for (let i = 1; i < this.listaOrdenadaZA.length; i++) {
      let aux: Producto = this.listaOrdenadaZA[i];
      ini = i;    //inicia el desplazamiento en i

      while (ini > 0 && (this.listaOrdenadaZA[ini - 1].getNombre().localeCompare(aux.getNombre())) < 0) {
        this.listaOrdenadaZA[ini] = this.listaOrdenadaZA[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaZA[ini] = aux;    //inserta elemento
    }
    return this.listaOrdenadaZA;

  }
  enlistarPrecioMN() {
    console.log("ingreso")

    let ini = 0;
    for (let i = 1; i < this.listaOrdenadaDescendente.length; i++) {
      console.log("ingreso")

      let aux: Producto = this.listaOrdenadaDescendente[i];
      ini = i;    //inicia el desplazamiento en i
      while (ini > 0 && this.listaOrdenadaDescendente[ini - 1].getPrecio() < aux.getPrecio()) {
        this.listaOrdenadaDescendente[ini] = this.listaOrdenadaDescendente[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaDescendente[ini] = aux;    //inserta elemento
    }
    return this.listaOrdenadaDescendente;
  }

  enlistarPrecioNM() {
    console.log("ingreso")

    let ini = 0;
    for (let i = 1; i < this.listaOrdenadaAscendente.length; i++) {
      console.log("ingreso")

      let aux: Producto = this.listaOrdenadaAscendente[i];
      ini = i;    //inicia el desplazamiento en i
      while (ini > 0 && this.listaOrdenadaAscendente[ini - 1].getPrecio() > aux.getPrecio()) {
        this.listaOrdenadaAscendente[ini] = this.listaOrdenadaAscendente[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaAscendente[ini] = aux;    //inserta elemento
    }

    return this.listaOrdenadaAscendente;
  }
  /*---------------------------------------------------------*/
























  setActualizarProducto(producto: Producto) {
    let path = producto.imagePath;
    this.descripcion = producto.descripcion
    this.ruta = this.srcImagen + path.substring(8);
    this.producto = new Producto(this.descripcion, producto.tipo, producto.precio, producto.cantidad, producto.foto, producto._id, path, producto.nombre, producto.fechavencimiento);
    console.log(this.ruta);
    console.log(this.producto);
    console.log(this.descripcion);
  }

  redireccion(producto: Producto) {
    localStorage.setItem('titulo', producto.getTipo());
    let ruta = "";
    if (producto.getTipo() == "frescos") {
      ruta = "productos_frescos";
    } else {
    }
  }

  productosEnGneral() {
    let res = false;
    /*if (this.titulo == "todos los productos") {
      res = true;
    }*/
    return res;
  }
}
