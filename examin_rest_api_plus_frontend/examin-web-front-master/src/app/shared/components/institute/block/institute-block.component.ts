import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'app/models/exam.model';
import { Institute } from 'app/models/institute.model';

@Component({
  selector: 'app-institute-block',
  templateUrl: './institute-block.component.html',
  styles: [`
    app-exam-card {
      display: contents;
    }
  `]
})
export class InstituteBlockComponent implements OnInit {

  @Input() institute: Institute;
  @Input() exams: Exam[];

  constructor() { }

  ngOnInit() {
  }

}
