import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from 'app/models/user.model';
import { environment } from 'environments/environment';

import { ApiService } from 'app/shared/services/api.service';
import { FileService } from 'app/shared/services/file.service';
import { HelperService } from 'app/shared/services/helper.service';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-user-edit-basic',
  templateUrl: './user-edit-basic.component.html',
  styleUrls: ['./user-edit-basic.component.scss']
})
export class UserEditBasicComponent implements OnInit {

  private filesBaseUrl = environment.FILES_BASE_URL;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  profileForm: FormGroup;
  submitted = false;
  inProcess = false;
  userId: number;
  user: User;

  // image upload
  uploadResponse;
  uploadError;
  public imageBaseUrl = environment.FILES_BASE_URL;
  isBase64 = false;
  minDate;
  isAdmin = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private toastr: ToastrService,
    private fileService: FileService,
    private helperService: HelperService,
    private modal: NgbModal,
    private authService: AuthService
  ) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear() - 70,
      month: current.getMonth(),
      day: current.getDate()
    };
  }

  ngOnInit() {
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.getUser(this.userId);
    });
    this.buildForm();
  }

  getUser(userId) {
    this.apiService.get('user/' + userId).subscribe((data) => {
      if (data['user']) {
        this.user = data['user'];
      }
      this.updateForm(this.user);
    });
  }

  /**
   * check if string is base64
   */
  // isBase64(str: string) {
  //   return this.helper.isBase64(str);
  // }

  /**
   * event add profile image
   */
  addPicture() {
    this.modal.open(this.modalContent);
  }

  closeModal() {
    this.modal.dismissAll();
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      fathersName: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      mothersName: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      username: ['', []],
      gender: ['', [Validators.required]],
      bio: ['', []],
      religion: ['', [Validators.required]],
      caste: ['', [Validators.required]],
      parentsNumber: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      aadhaarNumber: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(6)]],
      address: this.formBuilder.group({
        addressLine1: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        // addressLine2: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        cityVillageTown: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        state: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        district: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
        pincode: ['', [Validators.required]],
        country: ['India']
      }),
      secondaryAddress: this.formBuilder.group({
        addressLine1: ['', []],
        // addressLine2: ['', [Validators.maxLength(255), Validators.minLength(1)]],
        cityVillageTown: ['', []],
        state: ['', []],
        district: ['', []],
        pincode: ['', []],
        country: ['India']
      })
    });
  }

  updateForm(user) {
    if (!user) { return; }
    this.profileForm.patchValue({
      fullName: user.fullName,
      fathersName: user.fathersName,
      mothersName: user.mothersName,
      mobile: user.mobile,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      username: user.username,
      gender: user.gender,
      bio: user.bio,
      religion: user.religion,
      caste: user.caste,
      parentsNumber: user.parentsNumber,
      aadhaarNumber: user.aadhaarNumber,
      address: {
        addressLine1: user.address.addressLine1,
        // addressLine2: user.address.addressLine2,
        cityVillageTown: user.address.cityVillageTown,
        state: user.address.state,
        district: user.address.district,
        pincode: user.address.pincode,
        country: user.address.country ? user.address.country : 'India'
      },
      secondaryAddress: {
        addressLine1: user.secondaryAddress.addressLine1,
        // addressLine2: user.secondaryAddress.addressLine2,
        cityVillageTown: user.secondaryAddress.cityVillageTown,
        state: user.secondaryAddress.state,
        district: user.secondaryAddress.district,
        pincode: user.secondaryAddress.pincode,
        country: user.secondaryAddress.country ? user.secondaryAddress.country : 'India'
      }
    });
  }

  /**
   * submit form
   */
  onSubmit() {
    this.submitted = true;
    if (!this.profileForm.valid) {
      return this.toastr.error('Error in the form, please check!');
    }
    if (this.user['profileImage'] == '' || this.user['profileImage'] == null) {
      return this.toastr.error('Please upload profile picture');
    }

    this.inProcess = true;
    this.apiService.put(`user/${this.userId}`, this.profileForm.value).subscribe(
      data => {
        this.inProcess = false;
        this.toastr.success(data['message']);
        // TODO @abhijeet: do it via session service
        if (data['user'] && !this.isAdmin) {
          localStorage.setItem('loggedInUser', JSON.stringify(data['user']));
        }
        if (data['nextUrl']) {
          this.router.navigateByUrl(data['nextUrl']);
        } else {
          // this.router.navigateByUrl(`user/${this.userId}/view`);
          this.router.navigateByUrl(`dashboard`);
        }
      },
      error => {
        this.inProcess = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

  backClicked() {
    this.location.back();
  }

  uploadImage(base64: string) {
    // @abhijeet TODO: show image preloader start (optional)

    // showing preview image
    this.user['profileImage'] = base64;
    this.isBase64 = true;

    // preparing blob
    base64 = base64.replace(/^data:image\/(png|jpg);base64,/, '');
    const blob = this.helperService.base64ToBlob(base64, 'image/png');

    // preparing form data
    const formData = new FormData();
    formData.append('fileExtension', 'png');
    formData.append('fileType', 'avatar');
    formData.append('file', blob);

    // upload image
    // this.fileService.upload('file/upload', formData).subscribe(
    this.fileService.upload(`file/picture/${this.userId}`, formData).subscribe(
      (res) => {
        this.uploadResponse = res; // TODO: display the upload progress in UI
        if (res['progress'] >= 100) {
          this.toastr.success('Profile picture updated!');
          this.closeModal();
        }
      },
      (err) => this.uploadError = err
    );
  }

  copyaddress() {
    this.profileForm.patchValue({
      secondaryAddress: {
        addressLine1: this.profileForm.controls.address.value.addressLine1,
        cityVillageTown: this.profileForm.controls.address.value.cityVillageTown,
        state: this.profileForm.controls.address.value.state,
        district: this.profileForm.controls.address.value.district,
        pincode: this.profileForm.controls.address.value.pincode,
        country: this.profileForm.controls.address.value.country
      }
    })
  }

  fetchAddressByPincode(pincode) {
    this.apiService.get('user/pincode/' + pincode).subscribe((data) => {
      this.profileForm.patchValue({
        address: {
          district: data['message']['city'],
          state: data['message']['state'],
        }
      })
    });
  }

}
