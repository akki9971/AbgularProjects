import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  submitted = false;
  inProcess = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.authService.redirectLoggedInUser()
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required]]
    });
  }

  // On submit button click
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.inProcess = true;
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        // this.loginForm.reset();
        this.inProcess = false;
        if (data['user']['role'] === environment.roles.admin || data['user']['role'] === environment.roles.moderator) {
          this.router.navigateByUrl('/admin/home');
        } else {
          this.router.navigateByUrl('/home');
        }
      },
      error => {
        this.inProcess = false;
        if (error['error']['error'] === 'mobileNotVerified') {
          localStorage.setItem('registeredUser', JSON.stringify(error['error']['user']));
          this.router.navigateByUrl('/auth/verify');
        }
        if (error['error']['message']) {
          this.toastr.error(error['error']['message']);
        }
      }
    );
  }
}
