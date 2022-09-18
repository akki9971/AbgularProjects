import { Component, OnInit } from '@angular/core';
import { Question, Answer } from 'app/models/exam.model';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html'
})
export class ResultViewComponent implements OnInit {

  result = {
    marks: 0,
    score: 0
  }
  questions: Question[];
  examId: number;
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['user'];
    });
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      this.getResult();
    });
  }

  getResult() {
    const strResult = (this.userId > 0) ? `?user=${this.userId}` : '';
    this.apiService.get(`exam/${this.examId}/result${strResult}`).subscribe(
      data => {
        if (data['message']) {
          this.toastr.success(data['message']);
        }
        this.questions = data['questions'];
        if (this.questions) {
          this.calculate();
        }
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  calculate() {
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      this.result.marks += question['marks'];
      if (question.userAnswer === question.correctAnswer) {
        this.result.score += question['marks'];
      }
    }
  }

}
