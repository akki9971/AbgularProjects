import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { BankQuestion } from 'app/models/bank.question.model';
import { Category } from 'app/models/category.model';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CellCustomComponent } from './custom-button.component';

@Component({
  selector: 'bank-question-list',
  templateUrl: './question-list.component.html'
})
export class BankQuestionListComponent implements OnInit {

  categories: Category[];
  questions: BankQuestion[];
  isAdmin = false;
  inProgress: boolean = false;
  columnDefs = [
    {
      headerName: '#', cellRenderer: function (params) {
        return params.rowIndex + 1;
      }, resizable: true, maxWidth: 90, suppressCsvExport: true, field: 's_no'
    },
    { headerName: 'Category', field: 'name', resizable: true, maxWidth: 150, filter: true, },
    {
      headerName: 'QuestionL1', field: 'questionL1', resizable: true, maxWidth: 150, cellRenderer: function (params) {
        return params.value ? params.value : '';
      }
    },
    {
      headerName: 'QuestionL2', field: 'questionL2', resizable: true, maxWidth: 200, cellRenderer: function (params) {
        return params.value ? params.value : '';
      }
    },
    {
      headerName: 'Actions', cellRendererFramework: CellCustomComponent, suppressCsvExport: true,
      maxWidth: 200, suppressFilter: true, resizable: true
    },
  ];
  rowData = [];
  gridOptions: any;
  showToolPanel = true;
  autoHeight = true;
  private gridApi;
  private gridColumnApi;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },
      paginationPageSize: 10
    };
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.loadQuestion();
  }

  loadCategories() {
    this.apiService.get(`category`).subscribe(
      data => {
        this.categories = data['categories'];
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  loadQuestion() {
    this.apiService.get(`question-bank`).subscribe(
      data => {
        this.questions = data['questions'];
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  deleteQuestion(questionId: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.apiService.delete(`question-bank/${questionId}`).subscribe((data) => {
        this.inProgress = false;
        this.toastr.success(data['message']);
        this.questions = this.questions.filter((u) => u['questionId'] !== questionId);
      }, (error) => {
        this.inProgress = false;
        this.toastr.error(error['error']['message']);
      });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptions.api.setTotalPages = 15;
    this.gridOptions.api.setDomLayout('autoHeight');
  }

  onFilterTextBoxChanged(value) {
    this.gridOptions.api.setQuickFilter(value);
  }
}
