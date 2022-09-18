import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { University } from 'app/models/university.model';
import { ApiService } from 'app/shared/services/api.service';

@Component({
    selector: 'app-exam-university-form3',
    templateUrl: './exam-university-form3.component.html'
})
export class ExamUniversityForm3Component implements OnInit {

    @Input('university')
    set university(value: University) {
        if (value) {
            this.updateForm(value);
        }
    }

    @Input() examId: any;

    examUniversityForm3: FormGroup;
    inProcess = false;
    submitted = false;

    constructor(
        private location: Location,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private apiService: ApiService,
        private router: Router
    ) {
        this.buildForm();
    }

    buildForm() {
        this.examUniversityForm3 = this.formBuilder.group({
            sscPassingYear: [null, [Validators.required]],
            sscBoardName: [null, [Validators.required]],
            sscCertificateNumber: [null, [Validators.required]],
            sscPercentage: [null, [Validators.required]],
            hscPassingYear: [null],
            hscBoardName: [null],
            hscCertificateNumber: [null],
            hscPercentage: [null],
            graduationPassingYear: [null, []],
            graduationBoardName: [null, []],
            graduationCertificateNumber: [null, []],
            graduationPercentage: [null, []],
            postGraduationPassingYear: [null, []],
            postGraduationBoardName: [null, []],
            postGraduationCertificateNumber: [null, []],
            postGraduationPercentage: [null, []]
        });
    }

    ngOnInit() { }

    updateForm(university: University) {
        if (!university) { return; }
        this.examUniversityForm3.patchValue({
            sscPassingYear: university.sscPassingYear,
            sscBoardName: university.sscBoardName,
            sscCertificateNumber: university.sscCertificateNumber,
            sscPercentage: university.sscPercentage,
            hscPassingYear: university.hscPassingYear,
            hscBoardName: university.hscBoardName,
            hscCertificateNumber: university.hscCertificateNumber,
            hscPercentage: university.hscPercentage,
            graduationPassingYear: university.graduationPassingYear,
            graduationBoardName: university.graduationBoardName,
            graduationCertificateNumber: university.graduationCertificateNumber,
            graduationPercentage: university.graduationPercentage,
            postGraduationPassingYear: university.postGraduationPassingYear,
            postGraduationBoardName: university.postGraduationBoardName,
            postGraduationCertificateNumber: university.postGraduationCertificateNumber,
            postGraduationPercentage: university.postGraduationPercentage
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.examUniversityForm3.invalid) {
            return this.toastr.error('Error in the form, please check!');;
        }

        this.inProcess = true;
        this.apiService.post(`exam/${this.examId}/university`, this.examUniversityForm3.value).subscribe(
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

    backClicked() {
        this.location.back();
    }

}
