import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { HelperService } from 'app/shared/services/helper.service';
import { ExamState } from '../store/exam.state';
import { Question } from 'app/models/exam.model';
import { ExamActivateQuestion } from '../store/exam.actions';

@Component({
  selector: 'app-exam-progress',
  templateUrl: './exam-progress.component.html',
  styleUrls: ['./exam-progress.component.scss']
})
export class ExamProgressComponent implements OnInit {

  @Select(ExamState.getQuestions) questions$: Observable<Question[]>;
  @Select(ExamState.getAnsweredQuestions) answeredQuestions$: Observable<number>;
  @Select(ExamState.getUnansweredQuestions) unansweredQuestions$: Observable<number>;

  constructor(
    public helperService: HelperService,
    private store: Store
  ) { }

  ngOnInit() { }

  activateQuestion(questionId: number) {
    this.store.dispatch(new ExamActivateQuestion(questionId));
  }

}
