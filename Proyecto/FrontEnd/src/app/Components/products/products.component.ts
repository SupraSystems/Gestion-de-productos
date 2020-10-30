import { Component, OnInit } from '@angular/core';
import { Producto } from '../../Models/Producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  listaDeProductos: Producto[] = [];
  producto: Producto;// = new Producto(1, "amarillo", "holaholaholahola", "../../../assets/images/tipos-de-pinturas/anticorrosiva-OHM-241x187.jpg", "anticorr", 11, "anticoo");
  tipoProducto = "";
  titulo = "";
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.titulo = localStorage.getItem('titulo');
    this.tipoProducto = localStorage.getItem("tipo_producto");
    this.cargarLista();
    //
    this.todosLosProductos()
  }
  cargarLista() {
    console.log(this.tipoProducto, "-----------")
    if (this.tipoProducto == "todos_los_productos") {
      this.todosLosProductos();
    } else {
    }
  }

  todosLosProductos() {
    this.producto = new Producto("frescos",1,"producto comestible a base de resinas alquídicas, solventes, óxido de hierro de alta calidad e inhibidores de corrosión libres de plomo. USOS:   Hierro y Acero Protección de estructuras metálicas, rejas de hierro, ventanas, puertas, cañerías, maquinaria, etc.,", "https://static.ulabox.com/media/112534_m1.jpg",45,12,"frescos");
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
    this.listaDeProductos.push(this.producto);
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
