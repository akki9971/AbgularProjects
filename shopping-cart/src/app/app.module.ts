import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponent } from './components/shared/shared.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SliderComponent } from './components/shared/slider/slider.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { WomencollectionComponent } from './components/main/womencollection/womencollection.component';
import { BestsellerComponent } from './components/main/bestseller/bestseller.component';
import { DressesComponent } from './components/main/dresses/dresses.component';
import { DenimjacketComponent } from './components/main/denimjacket/denimjacket.component';
import { ProductslideComponent } from './components/productslide/productslide.component';
import { CopyrightComponent } from './components/shared/copyright/copyright.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductItemComponent } from './components/productslide/product-item/product-item.component';
import { HttpClientModule } from '@angular/common/http';
import { fetchApiService } from './services/fetch-api.service';
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/shared/header/cart/cart.component';
import { CheckoutComponent } from './components/shared/header/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    NavbarComponent,
    WomencollectionComponent,
    BestsellerComponent,
    DressesComponent,
    DenimjacketComponent,
    ProductslideComponent,
    CopyrightComponent,
    ProductItemComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  
  ],
  providers: [
    fetchApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
