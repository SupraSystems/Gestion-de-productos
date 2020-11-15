import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Producto } from "../Models/Producto";
import { DepFlags } from '@angular/compiler/src/core';

//import { Photo } from '../Components/interfaces/Photo'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  URL_API ="https://productos-backend.herokuapp.com/api/producto"
  listaproductos : Producto[];
  productoReg : Producto = new Producto("","",0,0,"","","","");

  constructor(private http: HttpClient) { }

  createPhoto(nombre: string, descripcion: string, photo: File) {
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('image', photo);
    return this.http.post(this.URL_API, fd);
  }

  getProducts(){
    return this.http.get<Producto[]>(this.URL_API)
  }
  getProductsCategoria(categoria:string){
    let url="https://productos-backend.herokuapp.com/api/categoria/"
    return this.http.get<Producto[]>(url+categoria);
  }

  addProduct(producto:Producto ){
    const fd = new FormData();
    fd.append('nombre', producto.getNombre());
    fd.append("descripcion", producto.getDescripcion());
    fd.append("tipo", producto.getTipo());
    fd.append("precio", producto.getPrecio()+"");
    fd.append("cantidad", producto.getCantidad()+"");
    fd.append("fechavencimiento", producto.getFecha());
    fd.append("coddescuento", "");
    fd.append("imagen", producto.getFile());
    //console.log(producto);
    console.log(fd);


    return this.http.post(this.URL_API,fd);
  }

  /*getPhotos(id: string){
    return this.http.get<Photo>(`${this.URL_API}/${id}`)
  }*/

}
