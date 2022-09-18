import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import {Subject, Observable} from 'rxjs';

import { ApiService } from 'app/shared/services/api.service';
import { Question, Exam } from 'app/models/exam.model';
import { HelperService } from 'app/shared/services/helper.service';
import { ExamService } from 'app/shared/services/exam.service';
import { ExamSetQuestions, ExamSetDetails, ExamSetExamStartTimer } from '../store/exam.actions';
import { ExamQuizComponent } from '../quiz/exam-quiz.component';
import { User } from 'app/models/user.model';
// webcam
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { FileService } from 'app/shared/services/file.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';

@Component({
  selector: 'app-exam-start',
  templateUrl: './exam-start.component.html',
  styles: ['./exam-start.component.scss']
})
export class ExamStartComponent implements OnInit {

  timeLeftAlert: number = 20;
  intervalAlert;
  subscribeTimerAlert: any;
  user: User;
  cameraAllowed = false;
  screenShotInterval= 30;
  examId: number;
  exam: Exam;
  questionsLoaded = false;
  timerCounter = 0; // TODO @abhijeetwebdev: make it dynamic
  timerLeft = 0;
  timerInterval = 1000;
  examStarted = false;
  // examFinished = false;
  currentQuestion: Question;
  currentQuestionIndex = 0;
  isFirst: boolean;
  isLast: boolean;
  allowTracking = true;
  inProcess = false;
  // webcam config
  modalOption: NgbModalOptions = {};
  modalOptionTime: NgbModalOptions = { backdrop : 'static', keyboard : false, size : 'lg'};
  modalReference: any;
  modalReferenceTime: any;
  firstImage = false;
  labelSCBtn = 'Take A Snapshot';
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
     width: {ideal: 180},
     height: {ideal: 150}
  };
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  public webcamFirstImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();


  @ViewChild('contentDialog', {static : false}) contentDialog: ElementRef<HTMLElement>;
  @ViewChild('systemIdealDialog', {static : false}) systemIdealDialog: ElementRef<HTMLElement>;
  @ViewChild(ExamQuizComponent, { static: false }) quiz: ExamQuizComponent;
  timeout;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: ApiService,
    private examService: ExamService,
    private helperService: HelperService,
    private fileService: FileService,
    private store: Store,
    private modalService: NgbModal
  ) { }

 // var timeout;
// console.log("start");
// document.onmousemove = function(){
//   clearTimeout(timeout);
//   timeout = setTimeout(function(){alert("move your mouse");}, 10000);
// }



  ngOnInit() {
    // const savedTime = localStorage.getItem(timerStorage);
    // if (savedTime) {
    //   this.timerCounter = parseInt(savedTime);
    // } else {
    //   this.timerCounter = 601;
    //   // this.timerCounter = 11;
    // }
    clearTimeout(this.timeout);
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      this.getExamDetails();
    });
  }

  /**
   * get exam details
   */
  getExamDetails() {
    this.inProcess = true;
    this.apiService.get(`exam/${this.examId}`).subscribe(
      data => {
        this.inProcess = false;
        this.exam = data['exam'];
        this.user = data['user'];
        // check and set timer of exam
        const examEndTime = new Date(data['exam'].dateTime.endDateTime);
        const currentTime = new Date(data['exam'].dateTime.currentTime);
        const secondsEndExam = (examEndTime.getTime() - currentTime.getTime()) / 1000;
        this.timerCounter = secondsEndExam;
        this.store.dispatch(new ExamSetExamStartTimer( this.timerCounter ));
        if (this.timerCounter > 0) {
          this.setExamState();
          this.examStart();
        } else {
          this.router.navigateByUrl('dashboard');
          this.toastr.error('Exam already over!');
        }
        this.getCameraPermission();
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  setExamState() {
    const examState = this.exam;
    delete examState.payment;
    delete examState.institute;
    this.store.dispatch(new ExamSetDetails(examState));
  }

  examStart() {
    this.examStarted = true; // TODO: start after getting questions?
    this.getQuestions();
    // this.initExamTimer();
  }

  getQuestions() {
    this.inProcess = true;
    this.examService.getQuestions(this.examId).subscribe(data => {
      if (data['questions'] && data['questions'].length > 0) {
        this.questionsLoaded = true;
        this.inProcess = false;
        this.store.dispatch(new ExamSetQuestions(data['questions']));
      }
    }, error => {
      this.inProcess = false;
      this.toastr.error(error['error']['message']);
      const nextUrl = error['error']['nextUrl'];
      if (nextUrl) {
        this.router.navigateByUrl(nextUrl);
      }
    });
  }

  timerUpdate(val) {
    this.timerLeft = val;
    this.store.dispatch(new ExamSetExamStartTimer(this.timerLeft));
    if (this.cameraAllowed && this.firstImage  && this.timerLeft !== 0
      && (this.timerLeft % this.screenShotInterval === 0 || this.timerLeft === 1))  {
      this.triggerSnapshot();
    }
    if (parseInt(val) <= 0) {
      this.toastr.warning('Timeup! Finishing your exam');
      this.quiz.finishExam();
    }
  }

  // webcam functions

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  uploadImage(base64: string, type: string= 'screenshots') {
   // preparing blob
    base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    const blob = this.helperService.base64ToBlob(base64, 'image/jpg');
    // preparing form data
    const formData = new FormData();
    formData.append('fileExtension', 'jpg');
    formData.append('fileType', 'webcam');
    formData.append('file', blob);
    this.fileService.upload(`file/image/${this.user.userId}/${this.examId}`, formData).subscribe(
      (res) => {
        if (res['progress'] === 100 && type === 'firstImage') {
          this.toastr.success('Success, Image successfully captured. You can continue with your exam!');
          this.checkFirstImage();
        }
        if (this.modalReference) {
          this.modalReference.close();
        }
      },
      (err) => { console.log('fileuploaderror', err); }
    );
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.uploadImage(this.webcamImage['_imageAsDataUrl']);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  getCameraPermission() {
    if (this.exam && this.exam['webcamCapture'] === true && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.cameraAllowed = true;
        this.checkFirstImage();
      }).catch(error => {
        this.cameraAllowed = false;
        if ((error.name === 'NotAllowedError') || (error.name === 'PermissionDismissedError')) {
          console.log('Camera error:', error.name);
        }
      });
    }
  }

  checkFirstImage() {
    this.apiService.get(`file/image/${this.user.userId}/${this.examId}`).subscribe((data) => {
      if (data && data['screenshots'] && data['screenshots'].length > 0) {
        this.firstImage = true;
        if (this.modalReference) {
          this.modalReference.close();
        }
        this.helperService.enableFullScreen();
      }else {
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        this.modalOption.size = 'lg';
        this.modalReference = this.modalService.open(this.contentDialog, this.modalOption);
      }
    });
  }


  public handleFirstImage(webcamFirstImage: WebcamImage): void {
    this.webcamFirstImage = webcamFirstImage;
    this.labelSCBtn = 'Take It Again';
  }

  public submitImage() {
    if (this.webcamFirstImage['_imageAsDataUrl'] !== '') {
      this.uploadImage(this.webcamFirstImage['_imageAsDataUrl'], 'firstImage');
    }else {
      this.toastr.error('Error, Please take the screenshot first!');
    }
  }

// movement ideal functions
  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e) {
  //   if (this.allowTracking) {
  //     clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => {
  //       this.showDialog();
  //       e.preventDefault();
  //     } , 10000);
  //   }
  // }



  public resetTimeIdeal() {
    this.allowTracking =  true;
    this.modalReferenceTime.close();
    clearInterval(this.intervalAlert);
    this.timeLeftAlert = 20;
  }

  showDialog() {
    this.allowTracking  = false;
    this.modalReferenceTime = this.modalService.open(this.systemIdealDialog, this.modalOptionTime);
    this.startTimerAlert();
  }

  observableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      this.subscribeTimerAlert = this.timeLeftAlert - val;
    });
  }

  startTimerAlert() {
    this.intervalAlert = setInterval(() => {
      if (this.timeLeftAlert > 0) {
        this.timeLeftAlert--;
      } else {
        if (this.modalReferenceTime) {
          this.modalReferenceTime.close();
        }
        this.resetTimeIdeal();
        this.helperService.loggedOut();
      }
    }, 1000)
  }
}
