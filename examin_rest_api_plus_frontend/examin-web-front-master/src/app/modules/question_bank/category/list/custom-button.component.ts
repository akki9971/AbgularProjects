import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categroy-custom-button',
  template: `
  <a *ngIf="isAdmin" (click)="linkUrl('edit_category')" class="warning p-0" data-original-title="Edit Category" title="Edit Category">
    <i class="ft-edit font-medium-3 mr-2"></i>
  </a>
  <a *ngIf="isAdmin" (click)="deleteCategory();" class="error p-0" data-original-title="Delete" title="Delete">
    <i class="ft-trash font-medium-3 mr-2"></i>
  </a>`
})


export class CategoryCellCustomComponent implements OnInit {
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

  deleteCategory() {
    const rowData = this.params.data;
    this.params.context.componentParent.deleteCategory(rowData.categoryId);
  }

  linkUrl(type) {
    const rowData = this.params.data;
    if (type === 'edit_category') {
      this.router.navigate(['/question-bank/category', rowData.categoryId, 'edit'], this.params.queryParams);
    }
  }
}
