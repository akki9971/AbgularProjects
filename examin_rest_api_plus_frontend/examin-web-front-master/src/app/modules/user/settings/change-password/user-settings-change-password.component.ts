import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings-change-password',
  templateUrl: './user-settings-change-password.component.html'
})
export class UserSettingsChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  inProcess = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confPassword: [null, [Validators.required]]
    },
    { validator: this.passwordConfirmCheck });
  }

  backClicked() {
    this.location.back();
  }

  /**
     * TODO: move this function to ValidatorService
     * to check pass and confirm pass
     * @param form control
     */
    passwordConfirmCheck(c: AbstractControl): { passwordMismatched: boolean } {
      if (c.get('newPassword').value !== c.get('confPassword').value) {
          return { passwordMismatched: true };
      }
      return null;
  }

  /**
   * submit form
   */
  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
      // this.toastr.error('Error in the form, please check!');
    } else {
      this.inProcess = true;
      this.apiService.post('auth/change-password', this.changePasswordForm.value).subscribe(
        data => {
          this.inProcess = false;
          this.toastr.success(data['message']);
          this.changePasswordForm.reset();
          this.router.navigate(['/auth/login']);        },
        error => {
          this.inProcess = false;
          this.toastr.error(error['error']['message']);
        }
      );
    }
  }

}
