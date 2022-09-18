import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Category } from 'app/models/category.model';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryCellCustomComponent } from './custom-button.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  isAdmin = false;
  inProgress: boolean = false;
  columnDefs = [
    {
      headerName: '#', cellRenderer: function (params) {
        return params.rowIndex + 1;
      }, resizable: true, maxWidth: 90, suppressCsvExport: true, field: 's_no'
    },
    { headerName: 'Category', field: 'name', resizable: true, maxWidth: 150 },
    {
      headerName: 'Actions', cellRendererFramework: CategoryCellCustomComponent, suppressCsvExport: true,
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

  deleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.apiService.delete(`category/${categoryId}`).subscribe((data) => {
        this.inProgress = false;
        this.toastr.success(data['message']);
        this.categories = this.categories.filter((u) => u['categoryId'] !== categoryId);
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
}
