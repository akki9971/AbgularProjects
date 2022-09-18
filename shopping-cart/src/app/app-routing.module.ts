import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductslideComponent } from './components/productslide/productslide.component';
import { CartComponent } from './components/shared/header/cart/cart.component';
import { CheckoutComponent } from './components/shared/header/checkout/checkout.component';

const routes: Routes = [
  { path: 'cartcomponent', component: CartComponent },
  { path: 'productslidecomponent', component: ProductslideComponent },
  { path: 'checkoutcomponent', component: CheckoutComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
