import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { findIndex as _findIndex, filter as _filter } from 'lodash';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { HelperService } from 'app/shared/services/helper.service';
import { ApiService } from 'app/shared/services/api.service';
import { Question, Answer, Exam } from 'app/models/exam.model';
import { ExamState } from '../store/exam.state';
import { ExamActivateQuestion, ExamActivateQuestionByIndex } from '../store/exam.actions';

@Component({
  selector: 'app-exam-quiz',
  templateUrl: './exam-quiz.component.html',
  styles: [`
    .m-r-20 {
      margin-right: 20px;
    }
  `]
})
export class ExamQuizComponent implements OnInit, OnDestroy {

  @Input() exam: Exam;

  @Select(ExamState.getQuestions) questions$: Observable<Question[]>;
  @Select(ExamState.getActiveQuestionProps) activeQuestionProps$: Observable<{index, questionId}>;
  
  inProgress = false;
  questions: Question[];
  allAnsRequired = true;
  activeQuestionProps: any;
  questionActivated = false;
  
  questionsSub: Subscription;
  activeQuestionPropsSub: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.questionsSub = this.questions$.subscribe((questions) => {
      // for local ref
      this.questions = questions;
      if (questions.length > 0) {
        if (!this.checkIfActive(questions) && !this.questionActivated) {
          this.questionActivated = true;
          this.store.dispatch(new ExamActivateQuestionByIndex(0));
        } else {
          this.questionActivated = true;
        }
      }
    });
    this.activeQuestionPropsSub = this.activeQuestionProps$.subscribe((attrs) => {
      this.activeQuestionProps = attrs;
    });
  }

  /**
   * marking the question active
   * @param Answer
   */
  setQuestionActive(questionId: number) {
    this.store.dispatch(new ExamActivateQuestion(questionId));
  }

  /**
   * check if active no active question
   */
  checkIfActive(questions: Question[]) {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (q.active === true) {
        return true;
      }
    }
    return false;
  }

  activateQuestion(action: string) {
    let targetIndex;
    if (action === 'prev') {
      targetIndex = this.activeQuestionProps.index - 1;
    } else {
      targetIndex = this.activeQuestionProps.index + 1;
    }
    this.store.dispatch(new ExamActivateQuestionByIndex(targetIndex));
  }

  ngOnDestroy() {
    this.questionsSub.unsubscribe();
    this.activeQuestionPropsSub.unsubscribe();
  }

  /**
   * quiz finish
   */
  finish() {
    // check if all answers are required
    if (this.allAnsRequired) {
      // check if all answered
      if (!this.allAnswered()) {
        this.toastr.warning('Please answer all questions!');
        return false;
      }
    }
    if (confirm('Are you sure you want to submit all answers?')) {
      this.finishExam();
    }
  }

  /**
   * Checks if all questions are answered
   * @return boolean
   */
  allAnswered() {
    if (this.questions.length === this.getCount('answered')) {
      return true;
    }
    return false;
  }

  /**
   * get count of the questions by type
   * @param type: answered | unanswered
   * @return number
   */
  getCount(type: string) {
    let count = 0;
    if (type === 'answered') {
      count = _filter(this.questions, (q) => q.userAnswer !== '').length;
    } else if (type === 'unanswered') {
      count = _filter(this.questions, (q) => q.userAnswer === '').length;
    }
    return count;
  }

  /**
   * save answers to database
   * @param answers
   */
  finishExam() {
    const answers: Answer[] = this.helperService.fetchAnswers(this.questions);
    this.inProgress = true;
    this.apiService.post(`exam/${this.exam.examId}/finish`, { answers: answers }).subscribe(
      data => {
        this.inProgress = false;
        this.toastr.success(data['message']);
        if (data['instantResult'] && data['instantResult'] === true) {
          this.router.navigateByUrl(`/result/${this.exam.examId}/view`);
          // const url = this.router.serializeUrl(
          //   // this.router.createUrlTree([`/result/${this.exam.examId}/view`]);
          //   this.router.createUrlTree([`/dashboard`])
          // );
          // window.open(url, '_self');
        } else {
          this.router.navigateByUrl(`/dashboard`);
        }
      },
      error => {
        this.inProgress = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

}
