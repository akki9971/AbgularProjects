import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AdminGuard } from 'app/shared/auth/admin-guard.service';
import { QuillModule } from 'ngx-quill';
import { CategoryListComponent } from './category/list/category-list.component';
import { CategoryAddComponent } from './category/create/category-add.component';
import { CategoryEditComponent } from './category/edit/category-edit.component';
import { CategoryFormComponent } from './category/form/category-form.component';
import { BankQuestionListComponent } from './question/list/question-list.component';
import { BankQuestionAddComponent } from './question/create/question-add.component';
import { BankQuestionEditComponent } from './question/edit/question-edit.component';
import { BankQuestionViewComponent } from './question/view/question-view.component';
import { BankQuestionFormComponent } from './question/form/exam-form.component';
import { BankQuestionUploadComponent } from './question/upload/question-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { CellCustomComponent } from './question/list/custom-button.component';
import { CategoryCellCustomComponent } from './category/list/custom-button.component';

const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'category',
    children: [
      { path: 'add', component: CategoryAddComponent },
      { path: ':categoryId/edit', component: CategoryEditComponent }
    ]
  },
  {
    path: 'questions',
    component: BankQuestionListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'question',
    children: [
      { path: 'add', component: BankQuestionAddComponent },
      { path: ':questionId/view', component: BankQuestionViewComponent },
      { path: ':questionId/edit', component: BankQuestionEditComponent },
      { path: 'import', component: BankQuestionUploadComponent }
    ]
  },
];

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    CategoryCellCustomComponent,
    BankQuestionFormComponent,
    BankQuestionListComponent,
    BankQuestionAddComponent,
    BankQuestionEditComponent,
    BankQuestionViewComponent,
    BankQuestionFormComponent,
    BankQuestionUploadComponent,
    CellCustomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents(['BtnCellRenderer']),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
        ]
      }
    })
  ],
  entryComponents: [CellCustomComponent, CategoryCellCustomComponent],
  exports: [RouterModule]
})
export class QuestionBankModule { }
