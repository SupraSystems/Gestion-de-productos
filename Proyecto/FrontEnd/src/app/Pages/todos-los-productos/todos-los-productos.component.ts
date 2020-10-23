import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos-los-productos',
  templateUrl: './todos-los-productos.component.html',
  styleUrls: ['./todos-los-productos.component.css']
})
export class TodosLosProductosComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('tipo_producto', "todos_los_productos");
    localStorage.setItem('titulo','todos los productos');  
  }
}
