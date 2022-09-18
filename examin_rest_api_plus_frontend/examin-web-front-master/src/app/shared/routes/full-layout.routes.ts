import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { AdminGuard } from '../auth/admin-guard.service';

// Route for content layout with sidebar, navbar and footer
export const FULL_ROUTES: Routes = [
  {
    path: 'home',
    redirectTo: 'dashboard',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./../../modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
    // TODO: @abhijeet add mobile verification check guard
  },
  {
    path: 'exam',
    loadChildren: () => import('./../../modules/exam/exam.module').then(m => m.ExamModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'question-bank',
    loadChildren: () => import('./../../modules/question_bank/questionbank.module').then(m => m.QuestionBankModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./../../modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./../../modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./../../modules/payment/payment.module').then(m => m.PaymentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./../../modules/notification/notification.module').then(m => m.NotificationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'result',
    loadChildren: () => import('./../../modules/result/result.module').then(m => m.ResultModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'page',
    loadChildren: () => import('./../../modules/pages/pages.module').then(m => m.PagesModule)
  }
];
