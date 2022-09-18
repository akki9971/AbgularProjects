import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Institute } from 'app/models/institute.model';
import { User } from 'app/models/user.model';
import { AuthService } from 'app/shared/auth/auth.service';
import { ApiService } from 'app/shared/services/api.service';
import { ExamService } from 'app/shared/services/exam.service';

@Component({
  selector: 'app-institute-selector',
  templateUrl: './institute-selector.component.html'
})
export class InstituteSelectorComponent implements OnInit {
  
  @Input() instituteId: number | string; // TODO @abhijeetwebdev: write a function to set the id if given
  @Output() onSelection: EventEmitter<any> = new EventEmitter();
  institutes: Institute[];
  usersInstitute: string;
  user: User;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getInstitute();
    this.getInstitutes();
  }

  getInstitutes() {
    this.examService.getInstitutes().subscribe((data) => {
      if (data && data['institutes']) {
        this.institutes = data['institutes'];
      }
    });
  }

  /**
   * get logged in users institute details
   */
  getInstitute() {
    this.apiService.get(`exam/institute/${this.user.instituteId}`).subscribe((data) => {
      if (data['institute']) {
        this.usersInstitute = data['institute'];
      }
    });
  }

  onChange(instituteId: any) {
    this.onSelection.emit(instituteId);
  }

}
