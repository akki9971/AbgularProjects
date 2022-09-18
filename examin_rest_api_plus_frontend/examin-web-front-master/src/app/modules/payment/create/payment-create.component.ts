import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html'
})
export class PaymentCreateComponent implements OnInit {

  form: FormGroup;
  inProcess = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {
    this.buildForm();
  }

  ngOnInit() { }

  buildForm() {
    this.form = this.formBuilder.group({
      examId: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });
  }

  backClicked() {
    this.location.back();
  }

  /**
   * submit form
   */
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return this.toastr.error('Error in the form, please check!');
    }

    if (confirm('Are you sure you want perform this action?')) {
      this.inProcess = true;
      this.apiService.post('payment/create', this.form.value).subscribe(
        data => {
          this.submitted = false;
          this.inProcess = false;
          this.toastr.success(data['message']);
          this.form.reset();        },
        error => {
          this.submitted = false;
          this.inProcess = false;
          this.toastr.error(error['error']['message']);
        }
      );
    }
  }

}
