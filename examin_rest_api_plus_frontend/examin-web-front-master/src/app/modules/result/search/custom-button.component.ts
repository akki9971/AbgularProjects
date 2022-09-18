import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-button',
  template: `<a (click)="viewResult()" title="View Complete Result"
  class="success p-0" data-original-title="View Complete Result">
          <i class="ft-eye font-medium-3 mr-2"></i>
        </a>
        <a (click)="getScreenshots()"  title="Webcam Captures"
        class="success p-0" data-original-title="Webcam Gallery">
          <i class="ft-image font-medium-3 mr-2"></i>
        </a>`
})


export class CellCustomComponent implements OnInit {
    data: any;
    params: any;
    userId: any;
    examId: any;

    constructor(private router: Router) {}

    agInit(params) {
      this.params = params;
      this.data = params.value;
    }
     ngOnInit() {
     }

    getScreenshots() {
      const rowData = this.params.data;
      this.params.context.componentParent.getScreenshots(rowData.userId , rowData.examId);
    }

    viewResult() {
      const rowData = this.params.data;
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/result', rowData.examId, 'view'], { queryParams: { user: rowData.userId } })
      );
      window.open(url, '_blank');
    }
  }
