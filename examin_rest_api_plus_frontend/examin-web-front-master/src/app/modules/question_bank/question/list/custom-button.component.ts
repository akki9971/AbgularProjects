import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-button',
  template: `
  <a (click)="linkUrl('view_question')" class="success p-0" data-original-title="View Question" title="View Question">
    <i class="ft-eye font-medium-3 mr-2"></i>
  </a>
  <a *ngIf="isAdmin" (click)="linkUrl('edit_question')" class="warning p-0" data-original-title="Edit Question" title="Edit Question">
    <i class="ft-edit font-medium-3 mr-2"></i>
  </a>
  <a *ngIf="isAdmin" (click)="deleteQuestion();" class="error p-0" data-original-title="Delete" title="Delete">
    <i class="ft-trash font-medium-3 mr-2"></i>
  </a>`
})


export class CellCustomComponent implements OnInit {
  data: any;
  params: any;
  isAdmin: any;

  constructor(private router: Router) { }

  agInit(params) {
    this.params = params;
    this.data = params.value;
    this.isAdmin = this.params.context.componentParent.isAdmin
  }
  ngOnInit() {
  }

  deleteQuestion() {
    const rowData = this.params.data;
    this.params.context.componentParent.deleteQuestion(rowData.questionId);
  }

  linkUrl(type) {
    const rowData = this.params.data;
    if (type === 'view_question') {
      this.router.navigate(['/question-bank/question', rowData.questionId, 'view'], this.params.queryParams);
    }
    if (type === 'edit_question') {
      this.router.navigate(['/question-bank/question', rowData.questionId, 'edit'], this.params.queryParams);
    }
  }
}
