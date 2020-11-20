import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { Router } from '@angular/router';
import { ServicesService } from "../../services/services.service";
import { BuscadorService } from 'src/app/services/buscador.service';
import { Combo } from 'src/app/models/Combo';
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

  srcImagen = "https://productos-backend.herokuapp.com/uploads/";
  listaDesordenada: Producto[] = [];
  listaTodosPr: Producto[] = [];
  listaOrdenadaAZ: Producto[] = [];
  listaOrdenadaZA: Producto[] = [];
  listaOrdenadaDescendente: Producto[] = [];
  listaOrdenadaAscendente: Producto[] = [];

  URLactual = "";
  buscarNombre = "";
  palabraBuscada = "";
  @Output() mostrarMensaje = new EventEmitter();

  //------------------------------
  listarCombos = false;
  listarPromociones = false;
  combo: Combo = new Combo("", "", 0, 0, "", "", "", "", [])
  listaCombos: Combo[] = [];
  listaProductosCombo: Producto[] = [];
  listarProductos = false;

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

    this.recuperarCategoria();

    if (localStorage.getItem('buscador') != "" && this.tipoProducto == "todos_los_productos") {
      let aux = { palabra: localStorage.getItem('buscador'), ruta: "todos_los_productos" }
      this.actualizarBuscador(aux);
      localStorage.setItem('buscador', "")
    }
  }

  // configuramos la recuperacion de informacion deacuerdo a la categoria a la que ingreso
  recuperarCategoria() {
    switch (this.tipoProducto) {
      case 'para_farmacia':
        this.getCategoria("Para Farmacia");
        break;
      case 'bebidas':
        this.getCategoria("Bebidas");
        break;
      case 'bebe':
        this.getCategoria("Bebe");
        break;
      case 'mascotas':
        this.getCategoria("Mascotas");
        break;
      case 'higiene_y_belleza':
        this.getCategoria("Higiene y Belleza");
        break;
      case 'basicos_del_hogar':
        this.getCategoria("Basicos del hogar");
        break;
      case 'frescos':
        this.getCategoria("Frescos");
        break;
      case 'alimentos':
        this.getCategoria("Alimentos");
        break;
      case 'todos_los_productos':
        this.getProductos();
        break;
      case 'combos':
        this.getCombos();
        break;
      case 'promociones':
        this.getPromociones();
        break;
      default:
        console.log('Categoria invalida');
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

  //obtenemos los productos de una categoria especifica que se tienen en la base de datos
  getCategoria(categoria: string) {
    this.listarProductos = true;
    this.productsService.getProductsCategoria(categoria).subscribe(
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
          this.listaDesordenada.push(this.producto);
        }
        this.listaTodosPr = this.listaDesordenada.slice();
        this.listaOrdenadaAZ = this.listaTodosPr;
        this.listaOrdenadaZA = this.listaTodosPr;
        this.listaOrdenadaDescendente = this.listaTodosPr;
        this.listaOrdenadaAscendente = this.listaTodosPr;
      },
      err => console.log(err)
    )
  }

  //obtenemos todos los productos que se tienen en la base de datos
  getProductos() {
    this.listarProductos = true;
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
          this.listaDesordenada.push(this.producto);
        }
        this.listaTodosPr = this.listaDesordenada.slice();
        this.listaOrdenadaAZ = this.listaTodosPr;
        this.listaOrdenadaZA = this.listaTodosPr;
        this.listaOrdenadaDescendente = this.listaTodosPr;
        this.listaOrdenadaAscendente = this.listaTodosPr;
      },
      err => console.log(err)
    )
  }


  //obtenemos los combos que se tienen en la base de datos
  getCombos() {
    this.listarCombos = true;

    let img = "https://tuguiacentral.com/wp-content/uploads/2019/10/combos_de_productos_tgc.png";
    let product = new Producto("", "basicos del hogar", 12, 23, "", "", "", "peras", "")
    this.listaProductosCombo.push(product);
    product = new Producto("", "basicos del hogar", 12, 23, "", "", "", "peras", "")
    this.listaProductosCombo.push(product);
    product = new Producto("", "basicos del hogar", 12, 23, "", "", "", "peras", "")
    this.listaProductosCombo.push(product);
    let combo1 = new Combo("combo por navidad no se lo pierda", "combo", 123, 5, img, "", img, "combo navideno", this.listaProductosCombo, "2/12/2020")
    let combo2 = new Combo("combo por navidad no se lo pierda", "combo", 123, 5, img, "", img, "combo navideno", this.listaProductosCombo, "2/12/2020")
    let combo3 = new Combo("combo por navidad no se lo pierda", "combo", 123, 5, img, "", img, "combo navideno", this.listaProductosCombo, "2/12/2020")
    let combo4 = new Combo("combo por navidad no se lo pierda", "combo", 123, 5, img, "", img, "combo navideno", this.listaProductosCombo, "2/12/2020")
    let combo5 = new Combo("combo por navidad no se lo pierda", "combo", 123, 5, img, "", img, "combo navideno", this.listaProductosCombo, "2/12/2020")
    let combo6 = new Combo("combo por navidad no se lo pierda", "combo", 123, 5, img, "", img, "combo navideno", this.listaProductosCombo, "2/12/2020")
    this.listaCombos.push(combo1);
    this.listaCombos.push(combo2);
    this.listaCombos.push(combo3);
    this.listaCombos.push(combo4);
    this.listaCombos.push(combo5);
    this.listaCombos.push(combo6);

  }

  //obtenemos las promociones que se tienen en la base de datos
  getPromociones() {

  }


  ordenar() {
    let orden = $("#orden").val();
    switch (orden) {
      case 'Precio Ascendente':
        this.listaTodosPr = this.enlistarPrecioMN();;
        break;
      case 'Precio Descendente':
        this.listaTodosPr = this.enlistarPrecioNM();;
        break;
      case 'Alfabeticamente Z-A':
        this.listaTodosPr = this.enlistarAlfabeticamenteZA();;
        break;
      case 'Alfabeticamente A-Z':
        this.listaTodosPr = this.enlistarAlfabeticamenteAZ();;
        break;
      default:
        this.listaTodosPr = this.listaDesordenada;;
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
      while (ini > 0 && this.listaOrdenadaDescendente[ini - 1].getPrecio() > aux.getPrecio()) {
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
      while (ini > 0 && this.listaOrdenadaAscendente[ini - 1].getPrecio() < aux.getPrecio()) {
        this.listaOrdenadaAscendente[ini] = this.listaOrdenadaAscendente[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaAscendente[ini] = aux;    //inserta elemento
    }

    return this.listaOrdenadaAscendente;
  }

  setActualizarProducto(producto: Producto) {
    let path = producto.imagePath;
    this.descripcion = producto.descripcion
    this.ruta = this.srcImagen + path.substring(8);
    this.producto = new Producto(this.descripcion, producto.tipo, producto.precio, producto.cantidad, producto.foto, producto._id, path, producto.nombre, producto.fechavencimiento);
    //console.log(this.ruta);
    //console.log(this.producto);
    //console.log(this.descripcion);
  }

  setActualizarCombo(combo: Combo) {
    this.combo = combo;
  }

}
