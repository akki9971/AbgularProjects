import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Institute } from 'app/models/institute.model';
import { ExamService } from 'app/shared/services/exam.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  institutes: Institute[];
  selectedInstitute: Institute;
  instituteUniqueName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private examService: ExamService
  ) {
    this.route.queryParams.subscribe(params => {
      this.instituteUniqueName = params['institute'];
      this.getInstitutes();
    });
  }

  ngOnInit() { }

  registered(user) {
    this.router.navigateByUrl('/auth/verify/mobile');
  }

  getInstitutes() {
    this.examService.getInstitutes().subscribe((data) => {
      if (data && data['institutes']) {
        this.institutes = data['institutes'];
        this.setInstitute();
      }
    });
  }

  setInstitute() {
    this.selectedInstitute = this.institutes.find(i => i.uniqueName === this.instituteUniqueName);
  }

}
