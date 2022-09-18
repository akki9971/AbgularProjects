import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CountdownModule } from 'ngx-countdown';
import { QuillModule } from 'ngx-quill';

// guards
import { AdminGuard } from 'app/shared/auth/admin-guard.service';

// shared modules and components
import { SharedModule } from 'app/shared/shared.module';

// components
import { ExamStartComponent } from './start/exam-start.component';
import { ExamProgressComponent } from './progress/exam-progress.component';
import { ExamCreateComponent } from './create/exam-create.component';
import { ExamListComponent } from './list/exam-list.component';
import { ExamInstructionComponent } from './instruction/exam-instruction.component';
import { ExamQuizComponent } from './quiz/exam-quiz.component';
import { ExamQuestionComponent } from './question/exam-question.component';
import { ExamQuestionCardComponent } from './question/card/exam-question-card.component';
import { ExamQuestionListComponent } from './question/list/exam-question-list.component';
import { ExamFormComponent } from './form/exam-form.component';
import { ExamEditComponent } from './edit/exam-edit.component';

import { ExamUniversityForm1Component } from './university/form1/exam-university-form1.component';
import { ExamUniversityForm2Component } from './university/form2/exam-university-form2.component';
import { ExamUniversityForm3Component } from './university/form3/exam-university-form3.component';
import { ExamScholarshipFormComponent } from './scholarship/exam-scholarship-form.component';
import { ExamUniversityComponent } from './university/exam-university.component';
import { WebcamModule } from 'ngx-webcam';

const routes: Routes = [
  { path: '', component: ExamListComponent },
  {
    path: 'create',
    component: ExamCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':examId',
    children: [
      { path: '', redirectTo: 'instruction', pathMatch: 'full' },
      { path: 'instruction', component: ExamInstructionComponent },
      { path: 'university', component: ExamUniversityComponent },
      { path: 'scholarship', component: ExamScholarshipFormComponent },
      { path: 'start', component: ExamStartComponent },
      {
        path: 'questions',
        component: ExamQuestionComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'edit',
        component: ExamEditComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    ExamStartComponent,
    ExamProgressComponent,
    ExamFormComponent,
    ExamCreateComponent,
    ExamEditComponent,
    ExamListComponent,
    ExamInstructionComponent,
    ExamQuizComponent,
    ExamQuestionComponent,
    ExamQuestionListComponent,
    ExamQuestionCardComponent,
    ExamUniversityComponent,
    ExamUniversityForm1Component,
    ExamUniversityForm2Component,
    ExamUniversityForm3Component,
    ExamScholarshipFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    //CountdownModule,
    WebcamModule,
    RouterModule.forChild(routes),
    QuillModule.forRoot({
      modules: {
        // syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
      
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
      
          ['clean'],                                         // remove formatting button
      
          // ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })
  ],
  exports: [RouterModule]
})
export class ExamModule { }
