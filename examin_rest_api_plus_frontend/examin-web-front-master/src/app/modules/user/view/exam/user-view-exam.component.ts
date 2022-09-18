import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

import { environment } from 'environments/environment';
import { User } from 'app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view-exam',
  templateUrl: './user-view-exam.component.html',
  styleUrls: ['./user-view-exam.component.scss']
})
export class UserViewExamComponent implements OnInit {

  user: User;
  userId: number;
  exams: any;

  public imageBaseUrl = environment.FILES_BASE_URL;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.getUser(this.userId);
      this.getUserExam(this.userId);
    });
  }

  getUser(userId) {
    this.apiService.get('user/' + userId).subscribe((data) => {
      if (data['user']) {
        this.user = data['user'];
      }
    });
  }

  getUserExam(userId) {
    this.apiService.get('exam/results?userId=' + userId).subscribe((data) => {
      if (data['examResult']) {
        this.exams = data['examResult'];
      }
    });
  }

}
