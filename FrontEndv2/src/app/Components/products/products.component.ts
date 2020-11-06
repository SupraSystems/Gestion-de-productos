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
      this.getCategoria("Para Farmacia");
    } else {
      if (this.tipoProducto == "bebidas") {
        this.getCategoria("Bebidas");
      } else {
        if (this.tipoProducto == "bebe") {
          this.getCategoria("Bebe");
        }else {
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
                    }else{
                      if(this.tipoProducto=="todos_los_productos"){
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
      },
      err => console.log(err)
    )
  }

  setActualizarProducto(producto: Producto) {
    let path = producto.imagePath;
    this.descripcion = producto.descripcion
    this.ruta = "http://localhost:4000/uploads/" + path.substring(8);
    this.producto = new Producto(this.descripcion, producto.tipo, producto.precio, producto.cantidad, producto.foto, producto._id, path, producto.nombre,producto.fechavencimiento);
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
