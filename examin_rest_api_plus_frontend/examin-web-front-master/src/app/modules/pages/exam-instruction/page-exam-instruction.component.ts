import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-exam-instruction',
  templateUrl: './page-exam-instruction.component.html',
  styleUrls: ['./page-exam-instruction.component.scss']
})
export class PageExamInstructionComponent implements OnInit {

  examId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.examId = params['examId']);
  }

}
