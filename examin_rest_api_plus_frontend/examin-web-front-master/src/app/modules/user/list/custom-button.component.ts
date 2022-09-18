import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-button',
  template: `
  <a  (click)="linkUrl('exam')" class="success p-0" data-original-title="Exam" title="Exam">
                      <i class="ft-list font-medium-3 mr-2"></i>
                    </a>
  <a (click)="linkUrl('view_user')" class="success p-0" data-original-title="View Profile" title="View Profile">
    <i class="ft-eye font-medium-3 mr-2"></i>
  </a>
  <a *ngIf="isAdmin" (click)="linkUrl('edit_user')" class="warning p-0" data-original-title="Edit Profile" title="Edit Profile">
    <i class="ft-edit font-medium-3 mr-2"></i>
  </a>
  <a *ngIf="isAdmin" (click)="deleteUser();" class="error p-0" data-original-title="Delete" title="Delete">
    <i class="ft-trash font-medium-3 mr-2"></i>
  </a>`
})


export class CellCustomComponent implements OnInit {
    data: any;
    params: any;
    userId: any;
    examId: any;
    isAdmin: any;

    constructor(private router: Router) {}

    agInit(params) {
      this.params = params;
      this.data = params.value;
      this.isAdmin = this.params.context.componentParent.isAdmin
    }
     ngOnInit() {
     }

    deleteUser() {
      const rowData = this.params.data;
      this.params.context.componentParent.deleteUser(rowData.userId);
    }

    linkUrl(type) {
      const rowData = this.params.data;
      if (type === 'exam') {
        this.router.navigate(['/user', rowData.userId, 'exam'], this.params.queryParams);
      }
      if (type === 'view_user') {
        this.router.navigate(['/user', rowData.userId], this.params.queryParams);
      }
      if (type === 'edit_user') {
        this.router.navigate(['/user', rowData.userId, 'edit'], this.params.queryParams);
      }
    }
  }
