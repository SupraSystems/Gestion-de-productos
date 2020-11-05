import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { ProductsComponent } from './Components/products/products.component';
import { FormRegistrationComponent } from './Pages/form-registration/form-registration.component';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { CarrouselComponent } from './Components/carrousel/carrousel.component';
import { TodosLosProductosComponent } from './Pages/todos-los-productos/todos-los-productos.component';
import { CombosComponent } from './Pages/combos/combos.component';
import { PromocionesComponent } from './Pages/promociones/promociones.component';
import { FrescosComponent } from './Pages/frescos/frescos.component';
import { AlimentacionComponent } from './Pages/alimentacion/alimentacion.component';
import { ParaFarmaciaComponent } from './Pages/para-farmacia/para-farmacia.component';
import { BassicosDelHogarComponent } from './Pages/bassicos-del-hogar/bassicos-del-hogar.component';
import { HigieneBellezaComponent } from './Pages/higiene-belleza/higiene-belleza.component';
import { MascotasComponent } from './Pages/mascotas/mascotas.component';
import { BebeComponent } from './Pages/bebe/bebe.component';
import { BebidasComponent } from './Pages/bebidas/bebidas.component';
import { RegistroProductosComponent } from './Pages/registro-productos/registro-productos.component';
import { RegistroCombosComponent } from './Pages/registro-combos/registro-combos.component';
import { RegistroDescuentosComponent } from './Pages/registro-descuentos/registro-descuentos.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {  MatNativeDateModule,} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ProductsComponent,
    FormRegistrationComponent,
    PrincipalComponent,
    CarrouselComponent,
    TodosLosProductosComponent,
    CombosComponent,
    PromocionesComponent,
    FrescosComponent,
    AlimentacionComponent,
    ParaFarmaciaComponent,
    BassicosDelHogarComponent,
    HigieneBellezaComponent,
    MascotasComponent,
    BebeComponent,
    BebidasComponent,
    RegistroProductosComponent,
    RegistroCombosComponent,
    RegistroDescuentosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
