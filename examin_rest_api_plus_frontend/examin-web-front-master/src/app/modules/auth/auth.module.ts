import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { LogoutComponent } from './logout/logout.component';
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/page/register-page.component';
import { RegisterFormComponent } from './register/form/register-form.component';
import { VerifyMobileComponent } from './verify/mobile//verify-mobile.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { SharedModule } from 'app/shared/shared.module';

// routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'verify',
    children: [
      { path: '', redirectTo: 'mobile', pathMatch: 'full' },
      { path: 'mobile', component: VerifyMobileComponent },
      // { path: 'email', component: VerifyEmailComponent },
    ]
  },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
];

@NgModule({
  declarations: [
    LogoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    VerifyMobileComponent,
    ForgotPasswordPageComponent,
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
export class AuthModule { }
