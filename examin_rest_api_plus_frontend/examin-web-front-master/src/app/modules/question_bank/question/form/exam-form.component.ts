import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BankQuestion } from 'app/models/bank.question.model';
import { Category } from 'app/models/category.model';
import { ApiService } from 'app/shared/services/api.service';
import { ExamService } from 'app/shared/services/exam.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-question-form',
  templateUrl: './question-form.component.html'
})
export class BankQuestionFormComponent implements OnInit {

  questionForm: FormGroup;
  inProcess = false;
  submitted = false;
  label = 'Create';
  question: BankQuestion;

  categories: Category[];
  selectedCategory: Category;
  categoryUniqueName: string;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private apiService: ApiService,
    private examService: ExamService,
    private router: Router
  ) {
    this.buildForm();
    this.getCategories();
  }

  @Input('question') set data(question) {
    if (question)
      this.question = question;
    this.label = 'Update'
    this.updateExamform(this.question);
  }

  ngOnInit() {
  }

  buildForm() {
    this.questionForm = this.formBuilder.group({
      questionL1: [null, [Validators.required]],
      questionL2: [null, [Validators.required]],
      AL1: [null, [Validators.required]],
      AL2: [null, [Validators.required]],
      BL1: [null, [Validators.required]],
      BL2: [null, [Validators.required]],
      CL1: [null, [Validators.required]],
      CL2: [null, [Validators.required]],
      DL1: [null, [Validators.required]],
      DL2: [null, [Validators.required]],
      correctAnswer: ['A', [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  updateExamform(question) {
    if (!question) { return; }
    this.questionForm.patchValue({
      questionL1: question.questionL1,
      questionL2: question.questionL2,
      AL1: question.AL1,
      AL2: question.AL2,
      BL1: question.BL1,
      BL2: question.BL2,
      CL1: question.CL1,
      CL2: question.CL2,
      DL1: question.DL1,
      DL2: question.DL2,
      correctAnswer: question.correctAnswer,
      categoryId: question.category.categoryId
    })
  }

  backClicked() {
    this.location.back();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.questionForm.valid) {
      this.inProcess = false;
      return;
    }
    let endPoint = 'question-bank';
    if (this.question && this.question.questionId) {
      endPoint = 'question-bank/' + this.question.questionId;
    }

    this.inProcess = true;
    this.apiService.post(endPoint, this.questionForm.value).subscribe(
      data => {
        this.inProcess = false;
        this.toastr.success(data['message']);
        this.router.navigateByUrl('/question-bank');
      },
      error => {
        this.inProcess = false;
        this.toastr.error(error['error']['message']);
      }
    );
  }

  getCategories() {
    this.apiService.get('category').subscribe((data) => {
      if (data && data['categories']) {
        this.categories = data['categories'];
        this.setCategories();
      }
    });
  }

  setCategories() {
    this.selectedCategory = this.categories.find(i => i.slug === this.categoryUniqueName);
  }

}
