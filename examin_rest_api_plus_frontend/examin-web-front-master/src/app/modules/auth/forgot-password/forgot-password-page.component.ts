import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  // fp steps
  step = 1;

  // step 1
  // mobileNumber: number;
  submitted1 = false;
  step1Form: FormGroup
  // mobileError = false;
  inProcess1 = false;

  // step 2
  step2Form: FormGroup
  submitted2 = false;
  inProcess2 = false;

  // otpNumber: number;
  // otpError = false;

  // step 3
  step3Form: FormGroup
  submitted3 = false;
  inProcess3 = false;

  // newPass: string;
  // confirmPass: string;
  // passError = false;
  // passMismatch = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.step1Form = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    });
    this.step2Form = this.formBuilder.group({
      otpNumber: ['', [Validators.required]]
    });
    this.step3Form = this.formBuilder.group({
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', []]
    }, { validator: this.passwordConfirmCheck });

  }


  // On submit click, reset form fields
  onMobileSubmit() {
    this.submitted1 = true;

    if (this.step1Form.invalid) {
      return;
    }
    this.inProcess1 = true;
    this.requestForOTP();
  }

  // ask for OTP
  requestForOTP() {
    // console.log("this.step1Form.value" + this.step1Form.value);
    // const reqPayload = JSON.stringify({ mobile: this.mobileNumber.toString() });
    this.authService.forgotPasswordMobile(this.step1Form.value).subscribe(
      data => {
        this.inProcess1 = false;
        localStorage.setItem(
          'forgotPasswordMobile',
          this.step1Form.value.mobile.toString()
        );
        this.toastr.success(data['message']);
        this.step = 2;
      },
      error => {
        this.inProcess1 = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

  onOtpSubmit() {
    this.submitted2 = true;

    if (this.step2Form.invalid) {
      return;
    }
    this.inProcess2 = true;
    this.submitOTP();
  }

  submitOTP() {
    const reqPayload = JSON.stringify({
      otp: this.step2Form.value.otpNumber.toString(),
      mobile: localStorage.getItem('forgotPasswordMobile')
    });
    this.authService.forgotPasswordSubmitOTP(reqPayload).subscribe(data => {
      // setting up local reference of otp number for future reference
      this.inProcess2 = false;
      localStorage.setItem('forgotPasswordOtp', this.step2Form.value.otpNumber.toString());
      this.toastr.success(data['message']);
      this.step = 3;
    },
      error => {
        this.inProcess2 = false;
        this.toastr.error(error['error']['message']);
      });
  }

  passwordConfirmCheck(c: AbstractControl): { passwordMismatched: boolean } {
    if (c.get('newPass').value !== c.get('confirmPass').value) {
      return { passwordMismatched: true };
    }
    return null;
  }

  onCreatePassword() {
    this.submitted3 = true;
    if (this.step3Form.invalid) { return; }
    this.inProcess3 = true;
    this.submitNewPassword(this.step3Form.get('newPass').value);

    // clean up local reference of otp number
    // localStorage.removeItem('forgotPasswordMobile');
  }

  submitNewPassword(newPass) {
    const reqPayload = JSON.stringify({
      otp: localStorage.getItem('forgotPasswordOtp'),
      mobile: localStorage.getItem('forgotPasswordMobile'),
      newPassword: newPass
    });
    this.authService.forgotPasswordNewPassword(reqPayload).subscribe(
      data => {
        // setting up local reference of otp number for future reference
        this.inProcess3 = false;
        localStorage.removeItem('forgotPasswordMobile');
        localStorage.removeItem('forgotPasswordOtp');
        this.toastr.success(data['message']);
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.inProcess3 = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

  resendOtp() {
    const reqPayload = JSON.stringify({
      mobile: localStorage.getItem('forgotPasswordMobile')
    });
    this.authService.resendOtp(reqPayload).subscribe(
      data => {
        this.toastr.success(data['message']);
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  // On login link click
  onLogin() {
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }
}
