import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { AuthService } from 'app/shared/auth/auth.service';
import { Institute } from 'app/models/institute.model';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

    @Output() registered: EventEmitter<any> = new EventEmitter();
    @Input() institutes: Institute[];
    @Input('institute')
    set institute(value: Institute) {
        if (value) {
            this.registerForm.controls['instituteId'].setValue(value.instituteId);
            this.registerForm.controls['instituteId'].disable();
        } else {
            this.registerForm.controls['instituteId'].setValue(1); // default will be examin
        }
    }

    registerForm: FormGroup;
    submitted = false;
    inProgress = false;
    tandcAccepted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        // private router: Router,
        private toastr: ToastrService
    ) {
        this.authService.redirectLoggedInUser()
        this.registerForm = this.formBuilder.group(
            {
                fullName: ['', Validators.required],
                mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                instituteId: [1] // default will be examin
            },
            { validator: this.passwordConfirmCheck }
        );
    }

    /**
     * TODO: move this function to ValidatorService
     * to check pass and confirm pass
     * @param form control
     */
    passwordConfirmCheck(c: AbstractControl): { passwordMismatched: boolean } {
        if (c.get('password').value !== c.get('confirmPassword').value) {
            return { passwordMismatched: true };
        }
        return null;
    }

    //  On submit click, reset field value
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        if (!this.tandcAccepted) {
            this.toastr.warning('Please accept terms and conditions to continue.');
            return;
        }

        this.inProgress = true;
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.getRawValue()).subscribe(
                data => {
                    // this.registerForm.reset();
                    this.inProgress = false;
                    this.toastr.success(data.message);
                    if (data.user) {
                        this.registered.emit(data.user);
                    } else {
                        this.toastr.error('Something went wrong!');
                    }
                    // this.router.navigateByUrl('/auth/verify');
                },
                error => {
                    // console.log(error);
                    this.inProgress = false;
                    this.toastr.error(error.error.message);
                }
            );
        }
    }
}
