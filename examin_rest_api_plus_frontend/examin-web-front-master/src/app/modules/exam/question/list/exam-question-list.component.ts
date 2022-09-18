import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'app/models/exam.model';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'app/shared/services/file.service';

@Component({
  selector: 'app-exam-question-list',
  templateUrl: './exam-question-list.component.html'
})
export class ExamQuestionListComponent implements OnInit {

  questions: Question[];
  examId: number;
  uploadResponse;
  uploadError;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
    });
    this.loadQuestion();
  }

  loadQuestion() {
    this.apiService.get(`exam/${this.examId}/questions`).subscribe(
      data => {
        this.questions = data['questions'];
      },
      error => {
        this.toastr.error(error['error']['message']);
      }
    );
  }

  fileChangeEvent(event) {
    // preparing form data
    const fileList: FileList = (<HTMLInputElement>event.target).files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData = new FormData();
      formData.append('fileExtension', 'xlsx');
      formData.append('fileType', 'question');
      formData.append('file', file, file.name);

      // upload file
      this.fileService.upload(`exam/${this.examId}/questions`, formData).subscribe(
        (res) => {
          this.uploadResponse = res; // TODO: display the upload progress in UI
          if (res['progress'] >= 100) {
            this.toastr.success('Questions are uploaded successfully!');
          }
          if (res['questions']) {
            this.questions = res['questions'];
          }
        },
        (err) => this.uploadError = err
      );
    }
  }

}
