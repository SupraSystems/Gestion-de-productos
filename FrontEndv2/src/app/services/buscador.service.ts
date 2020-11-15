import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  $emitter = new EventEmitter();

  emitirEvento(palabraRuta) {
    console.log("palabra a buscar ",palabraRuta," servicio")
      this.$emitter.emit(palabraRuta);
  }   
}