import { Component, OnInit } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { Router } from '@angular/router';
import { ServicesService } from "../../services/services.service";

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

  constructor(private router: Router, public productsService: ServicesService) {
  }

  ngOnInit(): void {
    this.productsService.listaproductos = [];
    this.titulo = localStorage.getItem('titulo');
    this.tipoProducto = localStorage.getItem("tipo_producto");
    if (this.tipoProducto == "para_farmacia") {
      this.getCategoria("parafarmacia");
    } else {
      if (this.tipoProducto == "bebidas") {
        this.getCategoria("bebidas");
      } else {
        if (this.tipoProducto == "bebe") {
          this.getCategoria("bebe");
        }else {
            if (this.tipoProducto == "mascotas") {
              this.getCategoria("mascotas");
            } else {
              if (this.tipoProducto == "higiene_y_belleza") {
                this.getCategoria("higieneybelleza");
              } else {
                if (this.tipoProducto == "basicos_del_hogar") {
                  this.getCategoria("basicosdelhogar");
                } else {
                  if (this.tipoProducto == "frescos") {
                    this.getCategoria("frescos");
                  } else {
                    if (this.tipoProducto == "alimentos") {
                      this.getCategoria("alimentacion");
                    }
                }
              }
            }
          }
        }
      }
    }
    //this.cargarLista();
    //
    //this.todosLosProductos()
  }
  getCategoria(categoria: string) {
    this.productsService.getProductsCategoria(categoria).subscribe(
      res => {
        this.productsService.listaproductos = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  getProductos() {
    this.productsService.getProducts().subscribe(
      res => {
        this.productsService.listaproductos = res;
        //this.listaDeProductos=this.productsService.listaproductos;
        console.log(res)
      },
      err => console.log(err)
    )
  }
  setActualizarProducto(producto: Producto) {
    let path = producto.imagePath;
    this.descripcion = producto.descripcion
    this.ruta = "http://localhost:4000/uploads/" + path.substring(8);
    this.producto = new Producto(this.descripcion, producto.tipo, producto.precio, producto.cantidad, producto.foto, producto._id, path, producto.nombre);
    console.log(this.ruta);
    console.log(this.producto);
    console.log(this.descripcion);
  }








  cargarLista() {
    console.log(this.tipoProducto, "-----------")
    if (this.tipoProducto == "todos_los_productos") {
      this.todosLosProductos();
    } else {
      if (this.tipoProducto == "alimentos") {
        this.getAlimentos();
      } else {

      }
    }
  }

  getAlimentos() {
    this.getProductos();
    console.log("producto tipo alimentos")
  }
  
  todosLosProductos() {
    /*this.producto = new Producto("frescos",1,"producto comestible a base de resinas alquídicas, solventes, óxido de hierro de alta calidad e inhibidores de corrosión libres de plomo. USOS:   Hierro y Acero Protección de estructuras metálicas, rejas de hierro, ventanas, puertas, cañerías, maquinaria, etc.,", "https://static.ulabox.com/media/112534_m1.jpg",45,12,"frescos");
    this.listaDeProductos.push(this.producto);
    this.producto = new Producto("frescos",1,"NITROLAC ACABADO NITROCELULÓSICO TIPO DUCO PARA EL REPINTADO DE AUTOS C-20 DESCRIPCIÓN Pintura, a base de nitrocelulosa y resinas sintéticas plastificantes, de secado rápido y fácil pulido. USOS:   Retoques y repintado general de automóviles, vehículos de trabajo pesado, refrigeradores, muebles metálicos, etc.", "https://static.ulabox.com/media/112537_m1.jpg", 87,90,"comida");
    this.listaDeProductos.push(this.producto);
    this.producto = new Producto("frescos",1,"producto comestible a base de resinas alquídicas, solventes, óxido de hierro de alta calidad e inhibidores de corrosión libres de plomo. USOS:   Hierro y Acero Protección de estructuras metálicas, rejas de hierro, ventanas, puertas, cañerías, maquinaria, etc.,", "https://static.ulabox.com/media/112534_m1.jpg",45,12,"frescos");
    this.listaDeProductos.push(this.producto);
    this.producto = new Producto("frescos",1,"NITROLAC ACABADO NITROCELULÓSICO TIPO DUCO PARA EL REPINTADO DE AUTOS C-20 DESCRIPCIÓN Pintura, a base de nitrocelulosa y resinas sintéticas plastificantes, de secado rápido y fácil pulido. USOS:   Retoques y repintado general de automóviles, vehículos de trabajo pesado, refrigeradores, muebles metálicos, etc.", "https://static.ulabox.com/media/112537_m1.jpg", 87,90,"comida");
    this.listaDeProductos.push(this.producto);
    this.producto = new Producto("frescos",1,"producto comestible a base de resinas alquídicas, solventes, óxido de hierro de alta calidad e inhibidores de corrosión libres de plomo. USOS:   Hierro y Acero Protección de estructuras metálicas, rejas de hierro, ventanas, puertas, cañerías, maquinaria, etc.,", "https://static.ulabox.com/media/112534_m1.jpg",45,12,"frescos");
    this.listaDeProductos.push(this.producto);
    this.producto = new Producto("frescos",1,"NITROLAC ACABADO NITROCELULÓSICO TIPO DUCO PARA EL REPINTADO DE AUTOS C-20 DESCRIPCIÓN Pintura, a base de nitrocelulosa y resinas sintéticas plastificantes, de secado rápido y fácil pulido. USOS:   Retoques y repintado general de automóviles, vehículos de trabajo pesado, refrigeradores, muebles metálicos, etc.", "https://static.ulabox.com/media/112537_m1.jpg", 87,90,"comida");
    this.listaDeProductos.push(this.producto);*/
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
    if (this.titulo == "todos los productos") {
      res = true;
    }
    return res;
  }

  setProducto(producto: Producto) {
    this.producto = producto;
  }
  setImagen(producto: Producto) {
    //localStorage.setItem('nombreProducto', producto.getNombre());
    //localStorage.setItem('imagen', producto.getFoto());
    //localStorage.setItem('precio', producto.getPrecio() + "");
    //this.router.navigate(['/formulario_compra_productos']);
  }
}
