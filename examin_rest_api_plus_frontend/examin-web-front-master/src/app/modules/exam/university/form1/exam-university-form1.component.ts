import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';

import { University } from 'app/models/university.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exam-university-form1',
    templateUrl: './exam-university-form1.component.html'
})
export class ExamUniversityForm1Component implements OnInit {

    @Input('university')
    set university(value: University) {
        if (value) {
            this.updateForm(value);
        }
    }
    
    @Input() examId: any;

    examUniversityForm1: FormGroup;
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

    ngOnInit() { }

    buildForm() {
        this.examUniversityForm1 = this.formBuilder.group({
            course: [null, [Validators.required]],
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
            graduationPercentage: [null, []]
        });
    }

    updateForm(university: University) {
        if (!university) { return; }
        this.examUniversityForm1.patchValue({
            course: university.course,
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
            graduationPercentage: university.graduationPercentage
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.examUniversityForm1.invalid) {
            return this.toastr.error('Error in the form, please check!');;
        }

        this.inProcess = true;
        this.apiService.post(`exam/${this.examId}/university`, this.examUniversityForm1.value).subscribe(
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
