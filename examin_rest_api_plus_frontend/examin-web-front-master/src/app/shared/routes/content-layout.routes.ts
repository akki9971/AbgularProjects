import { Routes } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./../../modules/misc/misc.module').then(m => m.MiscModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./../../modules/auth/auth.module').then(m => m.AuthModule)
  }
];
