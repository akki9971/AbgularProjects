import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
// import { UserSettingsChangePasswordComponent } from '../user/settings/change-password/user-settings-change-password.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'dashboard'
  },
  { path: 'dashboard', component: AdminDashboardComponent },
  // {
  //   path: 'settings',
  //   children: [
  //     { path: '', redirectTo: 'change-password', pathMatch: 'full' },
  //     { path: 'change-password', component: UserSettingsChangePasswordComponent }
  //   ]
  // }
];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    // UserSettingsChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
