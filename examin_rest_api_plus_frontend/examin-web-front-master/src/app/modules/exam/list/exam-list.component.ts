import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';
import { AuthService } from 'app/shared/auth/auth.service';

import { User } from 'app/models/user.model';
import { Exam } from 'app/models/exam.model';
import { Institute } from 'app/models/institute.model';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html'
})
export class ExamListComponent implements OnInit {

  exams: Exam[] = [];
  isAdmin = false;
  isModerator = false;
  isLoading: boolean = false;
  user: User;
  offset = 0;
  institute: Institute;
  examParams: {
    instituteId: number | string,
    offset: number | string,
    limit: number
  };

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    private authService: AuthService
  ) {

    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.authService.isModerator().subscribe((isModerator) => {
      this.isModerator = isModerator;
    });
    this.resetParams();
  }

  ngOnInit() {
    console.log(this.institute);
    this.user = this.authService.getUser();
  }

  setParams(type: string, value: any) {
    console.log(this.examParams);
    console.log(type);
    console.log(value);
    this.examParams[type] = value;
    this.getExams();
  }

  /**
   * get user institute details
   */
  getInstitute() {
    this.apiService.get(`exam/institute/${this.user.instituteId}`).subscribe((data) => {
      if (data['institute']) {
        this.institute = data['institute'];
      }
    });
    this.getExams();
  }

  getExams(refresh: boolean = true) {
    if (this.isLoading && !refresh) {
      return;
    }
    this.isLoading = true;
    this.apiService.getWithParams('exam', this.examParams).subscribe(
      data => {
        this.exams = data['exams'];
        this.isLoading = false;
      },
      error => {
        this.toastr.error(error['error']['message']);
        this.isLoading = false;
      }
    );
  }

  resetParams() {
    this.examParams = {
      limit: 2000,
      offset: 0,
      instituteId: ''
    };
  }

}
