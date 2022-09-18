import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';
import { Institute } from 'app/models/institute.model';
import { Exam } from 'app/models/exam.model';
import { ExamService } from 'app/shared/services/exam.service';
// import { MomentDateFormatter } from 'app/shared/services/date-parser.service';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html'
})
export class ExamFormComponent implements OnInit {

  examForm: FormGroup;
  inProcess = false;
  submitted = false;
  label = 'Create';
  exam: Exam;

  institutes: Institute[];
  selectedInstitute: Institute;
  instituteUniqueName: string;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private apiService: ApiService,
    private examService: ExamService,
    private router: Router,
    // private dateFormatter: MomentDateFormatter
  ) {
    this.buildForm();
    this.getInstitutes();
  }

  @Input('exam') set data(exam) {
    if (exam)
    this.exam = exam;
    this.label = 'Update'
    this.updateExamform(this.exam);
  }

  ngOnInit() {
  }

  buildForm() {
    this.examForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      date: [null, []],
      startTime: [null, []],
      endTime: [null, []],
      description: [null, [Validators.required]],
      feeAmount: [null, [Validators.required]],
      // languageId: [null, [Validators.required]],
      instantResult: [true, [Validators.required]], // true by default
      webcamCapture: [true, [Validators.required]], // true by default
      instituteId: [1, [Validators.required]]
    });
  }

  updateExamform(exam) {
    if (!exam) { return; }
    this.examForm.patchValue({
      title: exam.title,
      date: exam.date,
      startTime: exam.startTime,
      endTime: exam.endTime,
      description: exam.description,
      feeAmount: exam.feeAmount,
      instantResult: exam.instantResult,
      webcamCapture: exam.webcamCapture,
      instituteId: exam.instituteId
    })
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.examForm.valid) {
      // this.toastr.error('Error in the form, please check!');
      return;
    }

    // process values
    // const dateParsed = this.dateFormatter.parse(this.examForm.value.date);
    // const dateFormatted = this.dateFormatter.format(this.examForm.value.date);
    // console.log('dateParsed', dateParsed);
    // console.log('dateFormatted', dateFormatted);
    // return;

    let endPoint = 'exam/create';
    if (this.exam && this.exam.examId) {
      endPoint = 'exam/' + this.exam.examId;
    }

    this.inProcess = true;
    this.apiService.post(endPoint, this.examForm.value).subscribe(
      data => {
        this.inProcess = false;
        this.toastr.success(data['message']);
        this.router.navigateByUrl('/exam');
      },
      error => {
        this.inProcess = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

  getInstitutes() {
    this.examService.getInstitutes().subscribe((data) => {
      if (data && data['institutes']) {
        this.institutes = data['institutes'];
        this.setInstitute();
      }
    });
  }

  setInstitute() {
    this.selectedInstitute = this.institutes.find(i => i.uniqueName === this.instituteUniqueName);
  }

}
