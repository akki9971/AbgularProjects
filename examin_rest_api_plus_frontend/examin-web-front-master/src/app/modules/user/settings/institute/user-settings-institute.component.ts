import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-settings-institute',
  templateUrl: './user-settings-institute.component.html'
})
export class UserSettingsInstituteComponent implements OnInit {

  instituteForm: FormGroup;
  inProcess = false;
  submitted = false;
  user: User;
  isAdmin = false;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.user = this.authService.getUser();
  }

  buildForm() {
    this.instituteForm = this.formBuilder.group({
      instituteId: [null, [Validators.required]]
    });
  }

  setInstitute(type: string, value: any) {
    this.instituteForm.controls['instituteId'].setValue(value);
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.instituteForm.invalid) {
      return;
    }

    this.inProcess = true;
    this.apiService.put(`user/${this.user.userId}/institute`, this.instituteForm.value).subscribe(
      data => {
        this.inProcess = false;
        this.toastr.success(data['message']);
        // TODO @abhijeetwebdev: do it via session service
        if (data['user'] && !this.isAdmin) {
          localStorage.setItem('loggedInUser', JSON.stringify(data['user']));
        }
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.inProcess = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

}
