import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from 'app/shared/auth/admin-guard.service';

import { PaymentViewComponent } from './view/payment-view.component';
import { PaymentListComponent } from './list/payment-list.component';
import { PaymentCreateComponent } from './create/payment-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'create',
    component: PaymentCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':paymentId',
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: PaymentViewComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PaymentViewComponent,
    PaymentListComponent,
    PaymentCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PaymentModule { }
