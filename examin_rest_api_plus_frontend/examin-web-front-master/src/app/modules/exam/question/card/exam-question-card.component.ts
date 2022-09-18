import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Subscription, Observable } from 'rxjs';

import { Question, Answer } from 'app/models/exam.model';
import { ExamState } from '../../store/exam.state';
import { ExamSetAnswer } from '../../store/exam.actions';

@Component({
  selector: 'app-exam-question-card',
  templateUrl: './exam-question-card.component.html',
})
export class ExamQuestionCardComponent implements OnInit, OnDestroy {

  @Select(ExamState.getActiveQuestion) activeQuestion$: Observable<Question>;
  
  questionSub: Subscription;
  question: Question;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.questionSub = this.activeQuestion$.subscribe((question) => {
      this.question = question;
    });
  }

  onSelection(option) {
    const answer: Answer = {
      examId: this.question.examId,
      questionId: this.question.questionId,
      userAnswer: option
    }
    this.setAnswer(answer);
  }

  /**
   * marking the question answered
   * @param Answer
   */
  setAnswer(answer: Answer) {
    this.store.dispatch(new ExamSetAnswer(answer));
  }

  ngOnDestroy() {
    this.questionSub.unsubscribe();
  }

}
