import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CellCustomComponent } from './custom-button.component';
import {GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {



  resultParams: {
    instituteId: number | string,
    examId: number | string,
    userId: number | string,
    offset: number | string,
    limit: number
  };
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  results: any = [];
  institute: any;
  exams: [];
  selectedUser: any;
  selectedExam: any;
  gridOptions: any;
  title = 'app';
  showToolPanel = true;
  autoHeight= true;
  columnDefs = [
    { headerName : 'S.No.',  cellRenderer : function (params) {
        return params.rowIndex + 1;
      }, resizable: true, maxWidth : 100, suppressCsvExport : true, field : 's_no'
    },
    {headerName: 'Full Name', field: 'student', resizable: true,  maxWidth : 150 },
    {headerName: 'Mobile', field: 'mobile', resizable: true,  maxWidth : 150 },
    {headerName: 'Exam', field: 'exam_title', resizable: true,  maxWidth : 200  },
    {headerName: 'Exam Date', field: 'date', resizable: true,  maxWidth : 150 },
    {headerName: 'Total', field: 'total_marks', resizable: true,  maxWidth : 100 },
    {headerName: 'Earn', field: 'marks_obtained', resizable: true,  maxWidth : 100 },
    {headerName: 'Actions', cellRendererFramework : CellCustomComponent , suppressCsvExport : true,
      maxWidth : 150,  suppressFilter : true, resizable: true },
];

  rowData = [];
  @ViewChild('screenshotDialog', {static : false}) screenshotDialog: ElementRef<HTMLElement>;

  private gridApi;
  private gridColumnApi;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute) {
      this.gridOptions = <GridOptions>{
        context: {
            componentParent: this
        },
    };
    this.resetParams();
  }

  ngOnInit() {

  }

  setParams(type: string, value: any) {
    this.resultParams[type] = value;
    this.getResults(true);
  }

  setInstituteParams(type: string, value: any) {
    this.resetParams();
    this.resultParams[type] = value;
    this.getExam();
  }

  getExam() {
    if (this.resultParams.instituteId > 0) {
      this.apiService.get(`exam?limit=2000&offset=0&instituteId=${this.resultParams.instituteId}`).subscribe((data) => {
        if (data['exams']) {
          this.exams = data['exams'];
          this.getResults(true);
        }
      });
    }else {
      this.exams = [];
      this.results = [];
    }
  }

  getResults(refresh: boolean = true) {
    if (this.inProgress && !refresh) {
      return;
    }
    this.inProgress = true;
    this.apiService.get(`exam/results?limit=2000&offset=0&examId=${this.resultParams.examId}&instituteId=${this.resultParams.instituteId}`)
    .subscribe((data) => {
      this.inProgress = false;
      if (refresh) {
        this.resetResults();
      }
      this.rowData = data['examResult'];
      this.results.push(...(data['examResult'] || []));
    }, (error) => {
      this.inProgress = false;
      this.toastr.error(error['error']['message']);
    });
  }

  resetResults() {
    this.results = [];
    this.rowData = [];
  }

  resetParams() {
    this.resultParams = {
      limit: 2000,
      offset: 0,
      examId: '',
      instituteId: '',
      userId : ''
    };
  }

  getScreenshots(user, exam) {
    this.selectedUser = user;
    this.selectedExam = exam;
    this.modalService.open(this.screenshotDialog, { size: 'lg' });
  }

  onBtnExport() {
    const params = {
      columnKeys : ['student', 'mobile', 'exam_title', 'date', 'total_marks', 'marks_obtained'],
      suppressQuotes: false,
      columnSeparator: false,
      fileName : 'Result'
    };

    if (params.suppressQuotes || params.columnSeparator) {
      alert(
        'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
      );
    }
    this.gridApi.exportDataAsCsv(params);
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
