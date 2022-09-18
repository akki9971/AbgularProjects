import { Component, OnInit } from '@angular/core';

import { ApiService } from 'app/shared/services/api.service';
import { Exam } from 'app/models/exam.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html'
})
export class ExamEditComponent implements OnInit {

  examId: number;
  exam: Exam;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      this.getExam(this.examId);
    });
  }

  ngOnInit() {
  }

  getExam(examId) {
    this.apiService.get('exam/' + examId).subscribe((data) => {
      if (data['exam']) {
        this.exam = data['exam'];
      }
    });
  }


}
