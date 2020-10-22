import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { ProductsComponent } from './Components/products/products.component';
import { FormRegistrationComponent } from './Pages/form-registration/form-registration.component';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { CarrouselComponent } from './Components/carrousel/carrousel.component';
import { TodosLosProductosComponent } from './Pages/todos-los-productos/todos-los-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavBarComponent,
    ProductsComponent,
    FormRegistrationComponent,
    PrincipalComponent,
    CarrouselComponent,
    TodosLosProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
