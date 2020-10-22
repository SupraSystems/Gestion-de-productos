import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component'
import { TodosLosProductosComponent } from './Pages/todos-los-productos/todos-los-productos.component';

const routes: Routes = [
  { path: 'home', component: PrincipalComponent},
  { path: 'todos_los_productos', component: TodosLosProductosComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
