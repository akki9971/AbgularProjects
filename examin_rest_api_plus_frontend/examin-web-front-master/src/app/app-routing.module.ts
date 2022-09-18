import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MiscModule } from './modules/misc/misc.module';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { PageNotFoundComponent } from './modules/misc/page-not-found/page-not-found.component';

import { FULL_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';

import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'login', redirectTo: '/auth/login' },
  { path: 'logout', redirectTo: '/auth/logout' },
  { path: 'register', redirectTo: '/auth/register' },
  { path: '', component: ContentLayoutComponent, children: CONTENT_ROUTES },
  { path: '', component: FullLayoutComponent, children: FULL_ROUTES, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    MiscModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
