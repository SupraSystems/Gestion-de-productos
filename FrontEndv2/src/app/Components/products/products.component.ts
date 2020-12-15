import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { Router } from '@angular/router';
import { ServicesService } from "../../services/services.service";
import { BuscadorService } from 'src/app/services/buscador.service';
import { Combo } from 'src/app/Models/Combo';
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
  des=false;
  des1=true;

  //srcImagen = "https://productos-backend.herokuapp.com/uploads/";
  srcImagen = "http://localhost:4000/uploads/";
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
  productoActualizable: Producto;

  //ordenamiento
  listaTodosC: Combo[] = [];
  listaOrdenadaAZC: Combo[] = [];
  listaOrdenadaZAC: Combo[] = [];
  listaOrdenadaDescendenteC: Combo[] = [];
  listaOrdenadaAscendenteC: Combo[] = [];


  constructor(private router: Router, public productsService: ServicesService, public servicio: BuscadorService) {

  }

  ngOnInit(): void {
    this.productsService.listaproductos = [];
    this.titulo = localStorage.getItem('titulo');
    this.tipoProducto = localStorage.getItem("tipo_producto");
    this.servicio.$emitter.subscribe(x => {
      //if( this.tipoProducto!="combos"){
      this.actualizarBuscador(x);
      //}
    },
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
        this.getCombos();
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
    localStorage.setItem('aux', $("#inputs").val());
  }

  //actualizamos la palabra a buscar
  actualizarBuscador(msj) {
    //this.getCombos();
    this.buscarNombre = msj;
    this.tipoProducto = localStorage.getItem("tipo_producto");
    this.buscarNombre = msj.palabra
    this.URLactual = msj.ruta;
    console.log(this.URLactual, "-", this.tipoProducto)
    if (this.tipoProducto == msj.ruta || (msj.ruta == "productos_combos" && this.tipoProducto == "combos")) {
      //alert("ingresooooooo a aqui")
      let flag = false;
      if (msj.ruta == "productos_combos" && this.tipoProducto == "combos") {
        console.log("yabb terinooooooooooooooo")
        for (let i = 0; i < this.listaTodosC.length; i++) {
          if (!flag) {
            flag = this.nombresCoincidentes(this.listaTodosC[i].getNombre())
          }
        }
      } else {
        for (let i = 0; i < this.listaTodosPr.length; i++) {
          if (!flag) {
            flag = this.nombresCoincidentes(this.listaTodosPr[i].getNombre())
          }
        }if (msj.ruta == "todos_los_productos" && this.tipoProducto == "todos_los_productos") {
          console.log("yabb terinooooooooooooooo")
          for (let i = 0; i < this.listaTodosC.length; i++) {
            if (!flag) {
              flag = this.nombresCoincidentes(this.listaTodosC[i].getNombre())
            }
          }
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

  //verificamos si hay nombres que coincidan
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

  //listamos todos los productos
  ListarTodos() {
    this.buscarNombre = "";
  }

  //obtenemos los productos de una categoria especifica que se tienen en la base de datos
  getCategoria(categoria: string) {
    this.listarProductos = true;
    this.productsService.getProductsCategoria(categoria).subscribe(
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
          let descuento =this.productsService.listaproductos[i].porcentajedescuento;
          this.producto = new Producto(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, fechavencimiento,null, descuento)
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
        for (let i = 0; i < this.productsService.listaproductos.length; i++) {
          let nombre = this.productsService.listaproductos[i].nombre;
          let precio = this.productsService.listaproductos[i].precio;
          let cantidad = this.productsService.listaproductos[i].cantidad;
          let descripcion = this.productsService.listaproductos[i].descripcion;
          let fechavencimiento = this.productsService.listaproductos[i].fechavencimiento;
          let tipo = this.productsService.listaproductos[i].tipo;
          let imagen = this.srcImagen + this.productsService.listaproductos[i].imagePath.substring(8);
          let id = this.productsService.listaproductos[i]._id;
          let descuento =this.productsService.listaproductos[i].porcentajedescuento;
          this.producto = new Producto(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, fechavencimiento,null,descuento)
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
    this.productsService.getCombos().subscribe(
      res => {
        this.productsService.listacombos = res;
        for (let i = 0; i < this.productsService.listacombos.length; i++) {
          let nombre = this.productsService.listacombos[i].nombre;
          let precio = this.productsService.listacombos[i].precio;
          let descripcion = this.productsService.listacombos[i].descripcion;
          let fechavencimiento = this.productsService.listacombos[i].fechaconclusion;
          let fechaconclusion = this.productsService.listacombos[i].fechaconclusion;
          //console.log(this.productsService.listacombos[i].imagePath,"++++++++++++++++++++++++++++++++++++++++++")
          let imagen = this.srcImagen + this.productsService.listacombos[i].imagePath.substring(8);
          let id = this.productsService.listacombos[i]._id;
          let tipo = "";
          let cantidad = 0;
          let ids: string[] = this.productsService.listacombos[i].productos;
          let listarCombos = this.productsService.listacombos[i].listaProductos;
          this.combo = new Combo(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, listarCombos, fechavencimiento, null, ids, fechaconclusion)
          console.log(this.combo)
          this.listaCombos.push(this.combo);
        }
        this.listaTodosC = this.listaCombos.slice();
        this.listaOrdenadaAZC = this.listaTodosC
        this.listaOrdenadaZAC = this.listaTodosC
        this.listaOrdenadaDescendenteC = this.listaTodosC
        this.listaOrdenadaAscendenteC = this.listaTodosC
      },
      err => console.log(err)
    )
  }

  //obtenemos las promociones que se tienen en la base de datos
  getPromociones() {
    this.listarProductos = true;
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
          if(this.producto.getDescuento()!=0){
            this.listaDesordenada.push(this.producto);
          }
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


  // ordnamos los productos
  ordenarProductos() {
    let orden = $("#orden").val();
    console.log(localStorage.getItem("tipo_producto"))
    if (localStorage.getItem("tipo_producto") == "combos") {
      this.ordenarProductosCombo(orden);
    } else {
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
          this.listaTodosPr = this.listaDesordenada;
      }
    }
  }
  ordenarProductosCombo(orden) {
    switch (orden) {
      case 'Precio Ascendente':
        this.listaCombos = this.enlistarPrecioMNC();
        break;
      case 'Precio Descendente':
        this.listaCombos = this.enlistarPrecioNMC();
        break;
      case 'Alfabeticamente Z-A':
        this.listaCombos = this.enlistarAlfabeticamenteZAC();;
        break;
      case 'Alfabeticamente A-Z':
        this.listaCombos = this.enlistarAlfabeticamenteAZC();;
        break;
      default:
      //this.listaCombos = this.listaDesordenada;;
    }
  }


  // ordnamos los productos de la a a la z
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
  enlistarAlfabeticamenteAZC() {
    let ini;
    for (let i = 1; i < this.listaOrdenadaAZC.length; i++) {
      let aux: Combo = this.listaOrdenadaAZC[i];
      ini = i;    //inicia el desplazamiento en i

      while (ini > 0 && (this.listaOrdenadaAZC[ini - 1].getNombre().localeCompare(aux.getNombre())) > 0) {
        this.listaOrdenadaAZC[ini] = this.listaOrdenadaAZC[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaAZC[ini] = aux;    //inserta elemento
    }
    return this.listaOrdenadaAZC;
  }
  // ordnamos los productos de la z a la a
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
  enlistarAlfabeticamenteZAC() {
    let ini;
    for (let i = 1; i < this.listaOrdenadaZAC.length; i++) {
      let aux: Combo = this.listaOrdenadaZAC[i];
      ini = i;    //inicia el desplazamiento en i

      while (ini > 0 && (this.listaOrdenadaZAC[ini - 1].getNombre().localeCompare(aux.getNombre())) < 0) {
        this.listaOrdenadaZAC[ini] = this.listaOrdenadaZAC[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaZAC[ini] = aux;    //inserta elemento
    }
    return this.listaOrdenadaZAC;

  }

  // ordnamos los productos de mayor a menor
  enlistarPrecioMN() {
    let ini = 0;
    for (let i = 1; i < this.listaOrdenadaDescendente.length; i++) {
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
  enlistarPrecioMNC() {
    let ini = 0;
    for (let i = 1; i < this.listaOrdenadaDescendenteC.length; i++) {
      let aux: Combo = this.listaOrdenadaDescendenteC[i];
      ini = i;    //inicia el desplazamiento en i
      while (ini > 0 && this.listaOrdenadaDescendenteC[ini - 1].getPrecio() > aux.getPrecio()) {
        this.listaOrdenadaDescendenteC[ini] = this.listaOrdenadaDescendenteC[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaDescendenteC[ini] = aux;    //inserta elemento
    }
    return this.listaOrdenadaDescendenteC;
  }

  // ordnamos los productos de menor a mayor
  enlistarPrecioNM() {
    let ini = 0;
    for (let i = 1; i < this.listaOrdenadaAscendente.length; i++) {
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
  enlistarPrecioNMC() {
    let ini = 0;
    for (let i = 1; i < this.listaOrdenadaAscendenteC.length; i++) {
      let aux: Combo = this.listaOrdenadaAscendenteC[i];
      ini = i;    //inicia el desplazamiento en i
      while (ini > 0 && this.listaOrdenadaAscendenteC[ini - 1].getPrecio() < aux.getPrecio()) {
        this.listaOrdenadaAscendenteC[ini] = this.listaOrdenadaAscendenteC[ini - 1];    //desplaza el elemento hacia la derecha
        --ini;
      }

      this.listaOrdenadaAscendenteC[ini] = aux;    //inserta elemento
    }

    return this.listaOrdenadaAscendenteC;
  }

  //actualizamos el producto para que se vea en el modal
  setActualizarProducto(producto: Producto) {
    let path = producto.imagePath;
    this.descripcion = producto.descripcion
    this.ruta = this.srcImagen + path.substring(8);
    if(producto.porcentajedescuento>4)
    {
        this.des=true;
        this.des1=false;
        this.producto = new Producto(this.descripcion, producto.tipo, producto.precio, producto.cantidad, producto.foto, producto._id, path, producto.nombre, producto.fechavencimiento,null, producto.porcentajedescuento);
    }
    else {
      this.des=false;
      this.des1=true;
      this.producto = new Producto(this.descripcion, producto.tipo, producto.precio, producto.cantidad, producto.foto, producto._id, path, producto.nombre, producto.fechavencimiento,null,producto.porcentajedescuento);
    }
    
  }

  //actualizamos el combo para que se vea en el modal
  setActualizarCombo(combo: Combo) {
    this.listaProductosCombo = [];
    console.log(combo.getImagePath(), ":::::::::::::::::::::::::::")
    for (let k = 0; k < combo.getIds().length; k++) {
      this.productsService.getProducto(combo.getIds()[k]).subscribe(
        res => {
          this.listaProductosCombo.push(res);
        },
        err => console.log(err)
      )
    }

    this.combo = combo;
    $("#modalDetalleCombo").modal('show');
  }

  verificador() {
    return true;
  }

}
