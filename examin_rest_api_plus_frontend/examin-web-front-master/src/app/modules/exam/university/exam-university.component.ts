import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'app/shared/services/api.service';
import { University } from 'app/models/university.model';

@Component({
  selector: 'app-exam-university',
  templateUrl: './exam-university.component.html'
})
export class ExamUniversityComponent implements OnInit {
  
  examId: number;
  university: University;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      this.getUniversityDetails();
    });
  }

  getUniversityDetails() {
    this.apiService.get(`exam/${this.examId}/university`).subscribe((data) => {
      this.university = data['university'];
    });
  }

}
