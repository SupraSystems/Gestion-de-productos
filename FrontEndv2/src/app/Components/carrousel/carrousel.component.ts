import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Models/Producto';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  listaCatalogos: string[] = [];
  imgCatalogo = "";
  titulo = "";
  hrefArchivo="";
  srcImagen = "https://productos-backend.herokuapp.com/uploads/";
  producto: Producto = new Producto("", "", 0, 0, "", "", "", "");
  listaDescuentos:Producto[]=[];
  listaCincoDescuentos:Producto[]=[];
  constructor(private router: Router, public productsService: ServicesService) {
  }


  ngOnInit(): void {
    this.productsService.listaproductos = [];
    this.getProductos();
    this.titulo = localStorage.getItem('titulo');
    //this.enlistar();


  }
  enlistar(){
    this.listaCatalogos.push("../../../assets/Images/Carrousel/img1.jpg");
    this.listaCatalogos.push("../../../assets/Images/Carrousel/img2.jpg");
    this.listaCatalogos.push("../../../assets/Images/Carrousel/img3.jpg");
  }

   //obtenemos todos los productos que se tienen en la base de datos
   getProductos() {
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
          let porcentajedescuento = this.productsService.listaproductos[i].porcentajedescuento;
          this.producto = new Producto(descripcion, tipo, precio, cantidad, imagen, id, imagen, nombre, fechavencimiento,null,porcentajedescuento)
          this.listaDescuentos.push(this.producto);
          
        }
        this.ordenarProductosMayMen();

        for(let j = 0; j < 5 ;j ++){
          this.listaCincoDescuentos[j] = this.listaDescuentos[j];
        }

        //this.listaCincoDescuentos = this.listaDescuentos.slice();
        this.getImagenesDescuento();
        console.log(this.listaCincoDescuentos);
      },
      err => console.log(err)
    )
  }
/*
  ordenarProductosMenMay(){
    this.listaDescuentos.sort(((a, b) => a.precio - b.precio));
  }
*/
  //ordenar los productos para poder obtener de mayor a menor precio
  ordenarProductosMayMen(){
    this.listaDescuentos.sort(((a, b) => b.porcentajedescuento - a.porcentajedescuento));
  }

  getImagenesDescuento(){
    for (let i = 0; i < this.listaCincoDescuentos.length; i++) {
      this.listaCatalogos.push(this.listaCincoDescuentos[i].getImagePath());
    }
  }

}
