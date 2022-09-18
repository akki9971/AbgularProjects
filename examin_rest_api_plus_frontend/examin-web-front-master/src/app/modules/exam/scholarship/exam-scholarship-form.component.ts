import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import { ApiService } from 'app/shared/services/api.service';

import { Scholarship } from 'app/models/scholarship.model';
import { Exam } from 'app/models/exam.model';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-exam-scholarship-form',
  templateUrl: './exam-scholarship-form.component.html'
})
export class ExamScholarshipFormComponent implements OnInit {

  scholarshipForm: FormGroup;
  submitted = false;
  inProcess = false;
  userId: number;
  examId: number;
  user: User;
  exam: Exam;
  scholarship: Scholarship;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   this.userId = params['userId'];
    //   this.getUser();
    // });

    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      // this.getExamDetails();
      this.getScholarshipDetails();
    });
    this.buildForm();
  }

  // getUser() {
  //   this.apiService.get(`exam/${this.examId}/scholarship`).subscribe((data) => {
  //     this.scholarship = data['scholarship'];
  //     this.updateForm();
  //   });
  // }

  // getExamDetails() {
  //   this.apiService.get(`exam/${this.examId}`).subscribe(
  //     data => {
  //       this.exam = data['exam'];
  //       this.user = data['user'];
  //     },
  //     error => {
  //       this.toastr.error(error['error']['message']);
  //     }
  //   );
  // }

  getScholarshipDetails() {
    this.apiService.get(`exam/${this.examId}/scholarship`).subscribe((data) => {
      this.scholarship = data['scholarship'];
      this.updateForm();
    });
  }

  buildForm() {
    this.scholarshipForm = this.formBuilder.group({
      schoolName: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      examMedium: ['english', []],
      schoolClass: ['', [Validators.required]],
      address: this.formBuilder.group({
        addressLine1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        // addressLine2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        cityVillageTown: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        state: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        district: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        pincode: ['', [Validators.required]],
        country: ['India']
      })
    });
  }

  updateForm() {
    if (!this.scholarship) { return; }
    this.scholarshipForm.patchValue({
      schoolName: this.scholarship.schoolName,
      examMedium: this.scholarship.examMedium,
      schoolClass: this.scholarship.schoolClass,
      address: {
        addressLine1: this.scholarship.address.addressLine1,
        // addressLine2: this.scholarship.address.addressLine2,
        cityVillageTown: this.scholarship.address.cityVillageTown,
        state: this.scholarship.address.state,
        district: this.scholarship.address.district,
        pincode: this.scholarship.address.pincode,
        country: this.scholarship.address.country ? this.scholarship.address.country : 'India'
      }
    });
  }

  /**
   * submit form
   */
  onSubmit() {
    this.submitted = true;
    if (!this.scholarshipForm.valid) {
      this.toastr.error('Error in the form, please check!');
    } else {
      this.inProcess = true;
      this.apiService.post(`exam/${this.examId}/scholarship`, this.scholarshipForm.value).subscribe(
        data => {
          this.inProcess = false;
          this.toastr.success(data['message']);
          this.router.navigateByUrl(`exam/${this.examId}/instruction`);
        },
        error => {
          this.inProcess = false;
          this.toastr.error(error['error']['message']);
        }
      );
    }
  }

  backClicked() {
    this.location.back();
  }

}
