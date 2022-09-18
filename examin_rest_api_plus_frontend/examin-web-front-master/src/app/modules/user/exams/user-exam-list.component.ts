import { Component, OnInit } from '@angular/core';
import { Exam } from 'app/models/exam.model';
import { Institute } from 'app/models/institute.model';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiService } from 'app/shared/services/api.service';


@Component({
  selector: 'user-exam-list',
  templateUrl: './user-exam-list.component.html'
})
export class UserExamListComponent implements OnInit {


  exams: Exam[];
  user: User;
  offset = 0;
  institute: Institute;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getInstitute();
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
    this.getActiveExams();
  }





  getActiveExams() {
    const params = {
      limit: 12,
      offset: 0,
      instituteId: this.user.instituteId
    };
    this.apiService.getWithParams('exam/active', params).subscribe((data) => {
      if (data['exams'] instanceof Array && data['exams'].length > 0) {
        this.exams = data['exams'];
      }
    });
  }

}
