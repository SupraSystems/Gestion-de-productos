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

import { RegistroProductosComponent } from './Pages/registro-productos/registro-productos.component'
import { RegistroCombosComponent } from './Pages/registro-combos/registro-combos.component'
import { RegistroDescuentosComponent} from './Pages/registro-descuentos/registro-descuentos.component'

import { GuiaUsuarioComponent } from './Pages/guia-usuario/guia-usuario.component'


const routes: Routes = [
  { path: 'home', component: PrincipalComponent},
  { path: 'todos_los_productos', component: TodosLosProductosComponent},

  { path: 'frescos', component: FrescosComponent},
  { path: 'alimentos', component: AlimentacionComponent},
  { path: 'para_farmacia', component: ParaFarmaciaComponent},
  { path: 'basicos_del_hogar', component: BassicosDelHogarComponent},
  { path: 'higiene_y_belleza', component: HigieneBellezaComponent},
  { path: 'mascotas', component: MascotasComponent},
  { path: 'bebe', component: BebeComponent},
  { path: 'bebidas', component: BebidasComponent},
  { path: 'productos_en_promocion', component: PromocionesComponent},
  { path: 'productos_combos', component: CombosComponent},
  { path: 'registro_productos', component: RegistroProductosComponent},
  { path: 'registro_combos', component: RegistroCombosComponent},
  { path: 'registro_descuentos', component: RegistroDescuentosComponent},
  { path: 'guia_usuario', component: GuiaUsuarioComponent},

  { path: '', pathMatch: 'full', redirectTo: 'home' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
