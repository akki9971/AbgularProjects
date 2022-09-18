import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

import { ResultViewComponent } from './view/result-view.component';
import { ResultListComponent } from './list/result-list.component';
import { SearchResultComponent } from './search/search-result.component';
import {CellCustomComponent } from './search/custom-button.component';

const routes: Routes = [
    { path: '', component: ResultListComponent },
    { path: 'search', component: SearchResultComponent, pathMatch: 'full' },
    {
      path: ':examId',
      children: [
        { path: '', redirectTo: 'view', pathMatch: 'full' },
        { path: 'view', component: ResultViewComponent }
      ]
    }
];

@NgModule({
  declarations: [
    ResultViewComponent,
    ResultListComponent,
    SearchResultComponent,
    CellCustomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents(['BtnCellRenderer'])
  ],
  entryComponents : [CellCustomComponent],
  exports: [RouterModule]
})
export class ResultModule { }
