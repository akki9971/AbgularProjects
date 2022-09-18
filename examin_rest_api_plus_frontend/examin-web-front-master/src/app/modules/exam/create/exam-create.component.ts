import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'app/shared/services/api.service';
import { Router } from '@angular/router';
import { Institute } from 'app/models/institute.model';
// import { MomentDateFormatter } from 'app/shared/services/date-parser.service';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html'
})
export class ExamCreateComponent implements OnInit {

 ngOnInit() {

 }
}
