import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { Router, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { MatchPasswordDirective } from './directives/match-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    routingComponent,
    AuthComponent,
    PasswordPatternDirective,
    ValidateUserNameDirective,
    NavBarComponent,
    TemplateDrivenFormComponent,
    MatchPasswordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([   
  { path: '', component: TemplateDrivenFormComponent },
  { path: 'template-form', component: TemplateDrivenFormComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
