import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PageSupportComponent } from './support/page-support.component';
import { PageExamInstructionComponent } from './exam-instruction/page-exam-instruction.component';
import { PageExaminInstructionComponent } from './examin-instruction/page-examin-instruction.component';
import { PagesComponent } from './pages.component';
import { PageStaticComponent } from './static/page-static.component';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'support'
  },
  { path: 'support', component: PageSupportComponent },
  {
    path: 'exam-instruction',
    component: PagesComponent,
    children: [
      { path: '', component: PageExaminInstructionComponent },
      { path: ':examId', component: PageExamInstructionComponent }
    ]
  },
  { path: 'static', component: PageStaticComponent }
];

@NgModule({
  declarations: [
    PageSupportComponent,
    PageExamInstructionComponent,
    PagesComponent,
    PageExaminInstructionComponent,
    PageStaticComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class PagesModule { }
