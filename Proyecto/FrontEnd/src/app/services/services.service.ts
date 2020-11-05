import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Producto } from "../Models/Producto";
import { DepFlags } from '@angular/compiler/src/core';

//import { Photo } from '../Components/interfaces/Photo'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  URL_API = "http://localhost:4000/api/producto"

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

  addProduct(file: File ){
    //console.log(producto,"123");
    //this.productoReg=producto;
    //let nomb = this.productoReg.);
    //console.log(nomb);

    const fd = new FormData();
    fd.append('nombre', "pepe");
    fd.append("_id", "pepeid");
    fd.append("descripcion", "foto de pepe");
    fd.append("tipo", "Frescos");
    fd.append("precio", "151213");
    fd.append("cantidad", "10000000");
    fd.append("fechavencimiento", "02/02/2020");
    fd.append("coddescuento", "");
    fd.append("imagePath", file);

    //console.log(producto);
    console.log(fd);


    return this.http.post(this.URL_API, fd);

  }

  /*getPhotos(id: string){
    return this.http.get<Photo>(`${this.URL_API}/${id}`)
  }*/

}
