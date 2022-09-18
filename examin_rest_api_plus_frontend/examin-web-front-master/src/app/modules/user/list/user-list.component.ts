import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiService } from 'app/shared/services/api.service';
import { UserService } from 'app/shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CellCustomComponent } from './custom-button.component';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  noExamId = true
  users: User[];
  isAdmin = false;
  instituteId: number;
  exams: any;
  offset: string = '';
  inProgress: boolean = false;
  moreData: boolean = true;
  userParams: {
    instituteId: number | string,
    examId: number | string,
    payment_status: string,
    registerd_from: string,
    registerd_to: string,
    offset: number | string,
    limit: number
  };
  gridOptions: any;
  showToolPanel = true;
  autoHeight = true;
  columnDefs = [
    {
      headerName: '#', cellRenderer: function (params) {
        return params.rowIndex + 1;
      }, resizable: true, maxWidth: 90, suppressCsvExport: true, field: 's_no'
    },
    { headerName: 'UserID', field: 'userId', resizable: true, maxWidth: 150 },
    { headerName: 'username', field: 'username', resizable: true, maxWidth: 150 },
    { headerName: 'Name', field: 'fullName', resizable: true, maxWidth: 200 },
    { headerName: 'fathersName', field: 'fathersName', resizable: true, maxWidth: 150 },
    { headerName: 'gender', field: 'gender', resizable: true, maxWidth: 150 },
    { headerName: 'Date Of Birth', field: 'dateOfBirth', resizable: true, maxWidth: 150 },
    { headerName: 'email', field: 'email', resizable: true, maxWidth: 150 },
    { headerName: 'countryCode', field: 'countryCode', resizable: true, maxWidth: 150 },
    { headerName: 'Mobile', field: 'mobile', resizable: true, maxWidth: 150 },
    {
      headerName: 'Address', valueGetter: function (params) {
        return params.data.cityVillageTown + " " + params.data.state + " " + params.data.pincode;
      }, field: 'address', cellRenderer: function (params) {
        return params.data.cityVillageTown + " " + params.data.state + " " + params.data.pincode;
      }, resizable: true, maxWidth: 150
    },
    { headerName: 'role', field: 'role', resizable: true, maxWidth: 150 },
    { headerName: 'bio', field: 'bio', resizable: true, maxWidth: 150 },
    { headerName: 'caste', field: 'caste', resizable: true, maxWidth: 150 },
    { headerName: 'instituteId', field: 'instituteId', resizable: true, maxWidth: 150 },
    { headerName: 'createdAt', field: 'createdAt', resizable: true, maxWidth: 150 },
    { headerName: 'updatedAt', field: 'updatedAt', resizable: true, maxWidth: 150 },
    { headerName: 'parentsNumber', field: 'parentsNumber', resizable: true, maxWidth: 150 },
    { headerName: 'aadhaarNumber', field: 'aadhaarNumber', resizable: true, maxWidth: 150 },
    { headerName: 'religion', field: 'religion', resizable: true, maxWidth: 150 },
    {
      headerName: 'Actions', cellRendererFramework: CellCustomComponent, suppressCsvExport: true,
      maxWidth: 200, suppressFilter: true, resizable: true
    },
  ];
  rowData = [];
  private gridApi;
  private gridColumnApi;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService,
    private apiService: ApiService
  ) {

    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      },
      paginationPageSize: 10
    };
    // this.route.queryParams.subscribe(params => {
    //   this.instituteId = params['instituteId'];
    // });

    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.resetParams();
  }

  ngOnInit() {
    this.getUsers();
  }

  setParams(type: string, value: any) {
    if (type == 'examId' && value == -1) {
      this.noExamId = false
    } else {
      this.noExamId = true
    }
    this.userParams[type] = value;
    this.getUsers(true);
  }

  setInstituteParams(type: string, value: any) {
    this.resetParams();
    this.userParams[type] = value;
    this.getExam();
  }

  getExam() {
    if (this.userParams.instituteId > 0) {
      this.apiService.get(`exam?limit=2000&offset=0&instituteId=${this.userParams.instituteId}`).subscribe((data) => {
        if (data['exams']) {
          this.exams = data['exams'];
          this.exams.push({
            examId: -1,
            title: 'None'
          })
          this.getUsers(true);
        }
      });
    } else {
      this.exams = [];
      this.users = [];
    }
  }

  getUsers(refresh: boolean = true) {
    if (this.inProgress && !refresh) {
      return;
    }
    this.inProgress = true;
    this.userService.get(this.userParams).subscribe((data) => {
      this.inProgress = false;
      if (refresh) {
        this.resetUsers();
      }
      this.rowData = data['users'];
      this.users.push(...(data['users'] || []));
    }, (error) => {
      this.inProgress = false;
      this.toastr.error(error['error']['message']);
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(userId).subscribe((data) => {
        this.inProgress = false;
        this.toastr.success(data['message']);
        this.users = this.users.filter((u) => u['userId'] !== userId);
      }, (error) => {
        this.inProgress = false;
        this.toastr.error(error['error']['message']);
      });
    }
  }

  resetUsers() {
    this.users = [];
    this.rowData = [];
  }

  resetParams() {
    this.userParams = {
      limit: 2000,
      offset: 0,
      examId: '',
      instituteId: '',
      payment_status: '',
      registerd_from: '',
      registerd_to: '',
    };
  }

  // grid functions

  onBtnExport() {
    const params = {
      columnKeys: ['userId', 'username', 'firstName', 'lastName', 'fullName', 'fathersName', 'gender', 'dateOfBirth', 'email', 'countryCode', 'mobile', 'address', 'role', 'bio', 'caste', 'instituteId', 'createdAt', 'updatedAt', 'parentsNumber', 'aadhaarNumber', 'religion'],
      suppressQuotes: false,
      columnSeparator: false,
      fileName: 'StudentsList'
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
