import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from 'app/shared/shared.module';
import { PageTermsComponent } from './terms/page-terms.component';
import { PagePrivacyComponent } from './privacy/page-privacy.component';
import { PagePrivacyMobileComponent } from './privacy-mobile/page-privacy-mobile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'terms', component: PageTermsComponent },
  { path: 'privacy', component: PagePrivacyComponent },
  { path: 'privacy-mobile', component: PagePrivacyMobileComponent }
];

@NgModule({
  declarations: [
    LandingComponent,
    PageNotFoundComponent,
    PageTermsComponent,
    PagePrivacyComponent,
    PagePrivacyMobileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MiscModule { }
