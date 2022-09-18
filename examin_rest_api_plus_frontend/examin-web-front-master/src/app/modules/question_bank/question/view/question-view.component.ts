import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankQuestion } from 'app/models/bank.question.model';
import { ApiService } from 'app/shared/services/api.service';


@Component({
  selector: 'app-question-view-basic',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class BankQuestionViewComponent implements OnInit {

  questionId: number;
  question: BankQuestion;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.questionId = params['questionId'];
    });
  }

  ngOnInit() {
    this.getQuestion(this.questionId);
  }

  getQuestion(questionId) {
    this.apiService.get('question-bank/' + questionId).subscribe((data) => {
      if (data['question']) {
        this.question = data['question'];
      }
    });
  }

}
