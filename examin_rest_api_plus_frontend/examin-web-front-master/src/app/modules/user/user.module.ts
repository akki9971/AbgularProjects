import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { UserComponent } from './user.component';
import { UserListComponent } from './list/user-list.component';
import { UserViewBasicComponent } from './view/basic/user-view-basic.component';
import { UserEditBasicComponent } from './edit/basic/user-edit-basic.component';
import { UserSettingsComponent } from './settings/user-settings.component';
import { UserSettingsChangePasswordComponent } from './settings/change-password/user-settings-change-password.component';
import { UserViewExamComponent } from './view/exam/user-view-exam.component';
import { CellCustomComponent } from './list/custom-button.component';
import { UserExamListComponent } from './exams/user-exam-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { AdminGuard } from 'app/shared/auth/admin-guard.service';
import { UserSettingsInstituteComponent } from './settings/institute/user-settings-institute.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AdminGuard]
  },
  { path: 'exams', component: UserExamListComponent },
  {
    path: 'settings',
    children: [
      { path: '', redirectTo: 'change-password', pathMatch: 'full' },
      { path: 'change-password', component: UserSettingsChangePasswordComponent },
      { path: 'institute', component: UserSettingsInstituteComponent }
    ]
  },
  {
    path: ':userId',
    // component: UserComponent, // TODO @abhijeetwebdev: use this as a parent component and load user once and use the value as an observable in child components via user service
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      {
        path: 'view',
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: UserViewBasicComponent },
        ]
      },
      {
        path: 'exam',
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: UserViewExamComponent },
        ]
      },
      {
        path: 'edit',
        children: [
          { path: '', redirectTo: 'basic', pathMatch: 'full' },
          { path: 'basic', component: UserEditBasicComponent },
        ]
      },
    ]
  },

];

@NgModule({
  declarations: [
    UserSettingsComponent,
    UserComponent,
    UserViewBasicComponent,
    UserEditBasicComponent,
    UserListComponent,
    UserSettingsChangePasswordComponent,
    UserViewExamComponent,
    CellCustomComponent,
    UserExamListComponent,
    UserSettingsInstituteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AgGridModule.withComponents(['BtnCellRenderer'])
  ],
  entryComponents: [CellCustomComponent],
  exports: [RouterModule]
})
export class UserModule { }
