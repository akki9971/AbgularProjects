import { Component, OnInit } from '@angular/core';

import { ApiService } from 'app/shared/services/api.service';
import { NotificationService } from 'app/shared/services/notification.service';

import { Notification } from 'app/models/notification.model';
import { User } from 'app/models/user.model';
import { Exam } from 'app/models/exam.model';

import { ExamService } from 'app/shared/services/exam.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { Institute } from 'app/models/institute.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  notifications: Notification[];
  exams: Exam[];
  activeExams: Exam[];
  user: User;
  offset = 0;
  institute: Institute;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getNotifications();
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
    this.getEnrolledExams();
    this.getActiveExams();
  }

  getNotifications() {
    const params = {
      limit: 12,
      offset: this.offset,
    };
    this.notificationService.getNotifications(params).subscribe((resp) => {
      this.notifications = resp['notifications'];
      this.notificationService.updateUnreadCount(resp['unreadCount']);
    });
  }

  getExams() {
    const params = {
      limit: 12,
      offset: this.offset,
      instituteId: this.user.instituteId
    };
    this.apiService.getWithParams('exam', params).subscribe((data) => {
      if (data['exams']) {
        this.exams = data['exams'];
      }
    });
  }

  getEnrolledExams() {
    const params = {
      limit: 12,
      offset: 0,
      instituteId: this.user.instituteId
    };
    this.apiService.getWithParams('exam/enrolled', params).subscribe((data) => {
      if (data['exams'] instanceof Array && data['exams'].length > 0) {
        this.exams = data['exams'];
      } else {
        this.getExams(); // load all exams if not enrolled for any exam
      }
    });
  }

  getActiveExams() {
    const params = {
      limit: 12,
      offset: 0,
      instituteId: this.user.instituteId
    };
    this.apiService.getWithParams('exam/active', params).subscribe((data) => {
      if (data['exams'] instanceof Array && data['exams'].length > 0) {
        this.activeExams = data['exams'];
        let paidExams = []
        for (let i = 0; i < this.activeExams.length; i++) {
          const exam = this.activeExams[i];
          if (exam && exam['paymentStatus'] == 'credit') {
            paidExams.push(exam);
          }
        }
        if (paidExams.length > 0) {
          this.activeExams = paidExams;
        }

      }
    });
  }

}
