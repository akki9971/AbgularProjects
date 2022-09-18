import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-mobile',
  templateUrl: './verify-mobile.component.html',
  styleUrls: ['./verify-mobile.component.scss']
})
export class VerifyMobileComponent {

  otpForm: FormGroup;
  mobileHashed;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    const user = JSON.parse(localStorage.getItem('registeredUser'));
    if (user && user['mobile']) {
      this.mobileHashed = user['mobile'];
    } else {
      this.router.navigateByUrl('/home');
    }
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  // On submit button click
  onSubmit() {
    if (this.otpForm.valid) {
      this.authService.submitOTP(this.otpForm.value.otp).subscribe(
        data => {
          if (data['message']) {
            this.toastr.success(data['message']);
          }
          // clear signup progress required info
          localStorage.removeItem('registeredUser');
          this.otpForm.reset();
          if (data['nextUrl']) {
            this.router.navigateByUrl(data['nextUrl']);
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        },
        err => {
          if (err['error']) {
            this.toastr.error(err['error']['message']);
          }
        }
      );
    }
  }

}
