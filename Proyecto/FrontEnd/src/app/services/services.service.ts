import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Producto } from "../Models/Producto";

//import { Photo } from '../Components/interfaces/Photo'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  URL_API = "http://localhost:4000/api/producto"

  listaproductos : Producto[];

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

  /*getPhotos(id: string){
    return this.http.get<Photo>(`${this.URL_API}/${id}`)
  }*/

}
