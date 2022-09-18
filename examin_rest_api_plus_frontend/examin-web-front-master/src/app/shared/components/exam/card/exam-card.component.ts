import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'app/models/exam.model';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html'
})
export class ExamCardComponent implements OnInit {

  @Input() isAdmin = false;
  @Input() exam: Exam;

  constructor() { }

  ngOnInit() {
  }

}
