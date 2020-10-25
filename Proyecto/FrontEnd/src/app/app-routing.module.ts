import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './Pages/principal/principal.component'
import { TodosLosProductosComponent } from './Pages/todos-los-productos/todos-los-productos.component';

import { FrescosComponent } from './Pages/frescos/frescos.component'
import { AlimentacionComponent } from './Pages/alimentacion/alimentacion.component'
import { ParaFarmaciaComponent } from './Pages/para-farmacia/para-farmacia.component'
import { BassicosDelHogarComponent } from './Pages/bassicos-del-hogar/bassicos-del-hogar.component'
import { HigieneBellezaComponent } from './Pages/higiene-belleza/higiene-belleza.component'
import { MascotasComponent } from './Pages/mascotas/mascotas.component'
import { BebeComponent } from './Pages/bebe/bebe.component'
import { BebidasComponent } from './Pages/bebidas/bebidas.component'

import { PromocionesComponent } from './Pages/promociones/promociones.component'
import { CombosComponent } from './Pages/combos/combos.component'

const routes: Routes = [
  { path: 'home', component: PrincipalComponent},
  { path: 'todos_los_productos', component: TodosLosProductosComponent},

  { path: 'productos_frescos', component: FrescosComponent},
  { path: 'productos_alimenticios', component: AlimentacionComponent},
  { path: 'productos_de_farmacia', component: ParaFarmaciaComponent},
  { path: 'productos_del_hogar', component: BassicosDelHogarComponent},
  { path: 'productos_de_higiene_y_belleza', component: HigieneBellezaComponent},
  { path: 'productos_para_mascotas', component: MascotasComponent},
  { path: 'productos_para_bebe', component: BebeComponent},
  { path: 'productos_bebidas', component: BebidasComponent},
  { path: 'productos_en_promocion', component: PromocionesComponent},
  { path: 'productos_combos', component: CombosComponent},

  { path: '', pathMatch: 'full', redirectTo: 'home' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
