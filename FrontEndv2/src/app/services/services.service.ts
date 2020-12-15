import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Producto } from "../Models/Producto";
import { DepFlags } from '@angular/compiler/src/core';
import { Combo } from '../Models/Combo';
import { HttpRequest} from "@angular/common/http";


import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

//import { Photo } from '../Components/interfaces/Photo'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  //URL_API ="https://productos-backend.herokuapp.com/api/producto"
  //URL_API_CB = "https://productos-backend.herokuapp.com/api/combo"
  //URL_API_DS ="https://productos-backend.herokuapp.com/api/producto/"

  URL_API ="http://localhost:4000/api/producto"
  URL_API_CB = "http://localhost:4000/api/combo"
  URL_API_DS ="http://localhost:4000/api/producto/"

  listaproductos : Producto[];
  listacombos : Combo[];
  productoReg : Producto = new Producto("","",0,0,"","","","");
  

  //idDescuento ="";

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
    console.log(fd);
    return this.http.post(this.URL_API,fd);
  }

  getCombos(){
    return this.http.get<Combo[]>(this.URL_API_CB)
  }

  getProducto(id:string){
    let url2 ="https://productos-backend.herokuapp.com/api/producto/";
    return this.http.get<Producto>(url2+id);
  }

  addCombo(combo:Combo){
    const fdc = new FormData();
    for(let i=0 ; i< combo.getListaProducto().length ; i++){
      fdc.append("productos", combo.getListaProducto()[i].getId());
    }
    fdc.append("_id", combo.getId());
    fdc.append("nombre", combo.getNombre());
    fdc.append("descripcion", combo.getDescripcion());
    fdc.append("precio", combo.getPrecio()+"");
    fdc.append("fechaconclusion", combo.getFecha());
    fdc.append("imagen", combo.getFile());
    console.log(fdc);
    return this.http.post(this.URL_API_CB,fdc);
  }


  addDescuento(producto:Producto) {
    let idDescuento = producto.getId();
    let porDes =  producto.getDescuento();

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    

    let iddes = {'porcentajedescuento': porDes}

    return this.http.put(this.URL_API_DS+idDescuento, iddes, httpOptions);
  }

}
