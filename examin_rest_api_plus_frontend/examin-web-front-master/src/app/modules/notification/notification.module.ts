import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { NotificationCardComponent } from './card/notification-card.component';
import { NotificationListComponent } from './list/notification-list.component';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  { path: '', component: NotificationListComponent }
];

@NgModule({
  declarations: [
    NotificationListComponent,
    // NotificationCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NotificationModule { }
