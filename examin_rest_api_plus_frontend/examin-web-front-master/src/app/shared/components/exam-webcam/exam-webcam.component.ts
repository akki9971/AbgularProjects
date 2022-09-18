import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Institute } from 'app/models/institute.model';
import { ApiService } from 'app/shared/services/api.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-webcam-selector',
  templateUrl: './exam-webcam.component.html'
})
export class ExamWebcamComponent implements OnInit {


  @Input() examId: number | string;
  @Input() userId: number | string;

  public imageBaseUrl = environment.FILES_BASE_URL;
  screenshots: [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getExamScreenshots();
  }

  getExamScreenshots() {
    this.apiService.get(`file/image/${this.userId}/${this.examId}`).subscribe((data) => {
      if (data && data['screenshots']) {
        this.screenshots = data['screenshots'];
      }
    });
  }

}
