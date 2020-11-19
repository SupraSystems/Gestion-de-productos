import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductsComponent } from './Components/products/products.component';
import { BuscadorService } from './services/buscador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('ProductsComponent') productos2: ProductsComponent;

  title = 'FrontEnd';

  constructor(private servicio: BuscadorService){}
  ngOnInit(): void {
  }

  buscarProducto(msj:string){
    console.log("desde el padre el mensaje:  ",msj,"desde la ruta de: ")
    this.servicio.emitirEvento(msj);
  }
}
