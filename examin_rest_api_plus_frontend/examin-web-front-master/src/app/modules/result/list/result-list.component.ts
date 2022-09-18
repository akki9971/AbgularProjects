import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from 'app/shared/services/api.service';
import { Result } from 'app/models/result.model';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html'
})
export class ResultListComponent implements OnInit {

  results: Result[] = [];
  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this.isLoading = true;
    this.apiService.get('user/result').subscribe(
      data => {
        this.results = data['results'];
        this.isLoading = false;
      },
      error => {
        this.toastr.error(error['error']['message']);
        this.isLoading = false;
      }
    );
  }

}
