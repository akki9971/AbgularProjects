import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'app/models/user.model';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { Exam } from 'app/models/exam.model';
import { Notification } from 'app/models/notification.model';

import { ExamState } from '../store/exam.state';

import { Store, Select } from '@ngxs/store';
import { ExamSetExamEnableTimer } from '../store/exam.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-exam-instruction',
  templateUrl: './exam-instruction.component.html',
  styles: ['./exam-instruction.component.scss']
})

export class ExamInstructionComponent implements OnInit {

  user: User;
  exam: Exam;
  examId: number;
  isAdmin = false;
  paymentEnabled = false;
  notification: Notification;
  paymentServerLink = environment.API_BASE_URL + 'payment/initiate';
  timerCounter = 0;
  timerLeft = 0;
  timerInterval = 1000;
  examStartDate = null;
  examStart = false;
  examEnd = true;
  examAlreadyAttempt = false;
  examResultUrl: any;



  @Select(ExamState.getExamEnableTimer) examEnableTimer$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: ApiService,
    private authService: AuthService,
    private store: Store
  ) {
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  timerUpdate(val) {
    this.timerLeft = val;
    this.store.dispatch(new ExamSetExamEnableTimer(this.timerLeft));
    if (parseInt(val) <= 0) {
      this.toastr.warning('Exam Started!');
      this.examStart = true;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      this.getExamDetails();
    });
  }

  setPaymentState() {
    if (!this.exam.payment) {
      if (
        this.exam.feeAmount > 0
        // (this.exam.institute.uniqueName === 'mvsu' && this.exam.university) ||
        // (this.exam.institute.uniqueName === 'scholarship' && this.exam.scholarship)
      ) {
        this.paymentEnabled = true;
      }
    }
  }
  checkAlreadyExamAttempt() {
    this.apiService.get(`exam/checkExamAttempt/${this.examId}/${this.user.userId}`).subscribe(
      data => {
        this.examAlreadyAttempt = false;
      },
      error => {
        this.examAlreadyAttempt = true;
        this.examResultUrl = error['error']['nextUrl'];
      });
  }

  getExamDetails() {
    this.apiService.get(`exam/${this.examId}`).subscribe(
      data => {
        this.exam = data['exam'];
        this.user = data['user'];
        this.checkAlreadyExamAttempt();
        this.setNotification();
        this.setPaymentState();
        this.setExamState(data);
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  setExamState(data) {
    const examStartTime = new Date(data['exam'].dateTime.startDateTime);
    const examEndTime = new Date(data['exam'].dateTime.endDateTime);
    const currentTime = new Date(data['exam'].dateTime.currentTime);
    const secondsStartExam = (examStartTime.getTime() - currentTime.getTime()) / 1000;
    const secondsEndExam = (examEndTime.getTime() - currentTime.getTime()) / 1000;
    this.examEnd = (secondsEndExam >= 0) ? false : true;
    this.timerCounter = secondsStartExam;
    if (this.timerCounter <= 0) {
      this.examStart = true;
    }
    this.store.dispatch(new ExamSetExamEnableTimer( this.timerCounter ));
  }

  /**
   * set notification
   */
  setNotification() {
    if (this.user.profileCompleted === false) {
      this.notification = {
        title: 'Please complete your profile!',
        body: 'In order to apply for an exam, please complete your profile by clicking here',
        link: `/user/${this.user.userId}/edit/basic`
      };
    } else {
      if (
        this.exam.institute.uniqueName === 'scholarship' &&
        this.exam.scholarship === false
      ) {
        this.notification = {
          title: 'Please fill your scholarship enrollment form!',
          body: 'In order to apply for an eScholarship exam, please fill the enrollment form by clicking here',
          link: `/exam/${this.exam.examId}/scholarship`
        };
      }

      if (
        this.exam.institute.uniqueName === 'mvsu' &&
        this.exam.university === false
      ) {
        this.notification = {
          title: 'Please fill your MVSU university enrollment form!',
          body: 'In order to apply for the MVSU university exam, please fill the enrollment form by clicking here',
          link: `/exam/${this.exam.examId}/university`
        };
      }
    }
  }

  /**
   * update the payment status to the exam var
   */
  feesPaid(payment) {
    window.location.reload();
    // console.log('feesPaid', payment);
    // console.log('before', this.exam);
    // this.exam.payment = payment;
    // console.log('after', this.exam);
    // this.getExamDetails();
  }

}
