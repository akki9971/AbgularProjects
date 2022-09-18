import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Answer } from 'app/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
    
  endpoint = 'exam';

  constructor(
    private apiService: ApiService
  ) { }
  
  /**
   * get exams
   * @params request params
   */
  get(params: object) {
    return this.apiService.getWithParams(this.endpoint, params);
  }

  /**
   * laod exams
   * @param examId
   */
  getQuestions(examId: number) {
    return this.apiService.get(`${this.endpoint}/${examId}/start`);
  }

  /**
   * load institutes
   */
  getInstitutes(params?: object) {
    return this.apiService.getWithParams(`${this.endpoint}/institutes`, params);
  }

  /**
   * save answers
   * @params examId: number
   */
  saveAnswers(examId: number, answers: Answer[]) {
    const payload = {
      answers: answers
    };
    return this.apiService.post(`${this.endpoint}/${examId}/answers`, payload);
  }

}
