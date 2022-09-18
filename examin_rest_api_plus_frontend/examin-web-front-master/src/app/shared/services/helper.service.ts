import { Injectable } from '@angular/core';
import { Question, Answer } from 'app/models/exam.model';
import { elementAt } from 'rxjs-compat/operator/elementAt';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /**
   * get answers array from quiz
   * @param Question[]
   * @return Answer[]
   */
  fetchAnswers(questions: Question[]) {
    const answers: Answer[] = [];
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const answer: Answer = {
        examId: q.examId,
        questionId: q.questionId,
        userAnswer: q.userAnswer
      }
      answers.push(answer);
    }
    return answers;
  }

  public base64ToBlob(base64, mime) {
    mime = mime || '';
    const sliceSize = 1024;
    const byteChars = window.atob(base64);
    const byteArrays = [];

    for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      const slice = byteChars.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mime });
  }

  public numberPadding(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s
    };
    return s;
  }

  public toggleFullscreen() {
    const elem = <HTMLElement>document.querySelector('#navbar-fullscreen');
    if (elem) { elem.click(); }
  }

  public toggleSidebarNav() {
    const elem2 = <HTMLElement>document.querySelector('#sidebarToggle i');
    if (elem2) { elem2.click(); }
  }

  public disableFullScreen() {
    const elemHeader = <HTMLElement>document.querySelector('.header-navbar');
    if (elemHeader) { elemHeader.style.display = 'block'; }

    const elemSidebar = <HTMLElement>document.querySelector('.app-sidebar');
    if (elemSidebar) { elemSidebar.style.display = 'block'; }
  }

  public enableFullScreen() {
    const elem = <HTMLElement>document.querySelector('#navbar-fullscreen');
    if (elem) { elem.click(); }

    const elemHeader = <HTMLElement>document.querySelector('.header-navbar');
    if (elemHeader) { elemHeader.style.display = 'none'; }

    const elem2 = <HTMLElement>document.querySelector('#sidebarToggle i');
    if (elem2) { elem2.click(); }

    const elemSidebar = <HTMLElement>document.querySelector('.app-sidebar');
    if (elemSidebar) { elemSidebar.style.display = 'none'; }

  }

  public isBase64(str) {
    if (str === '' || str.trim() === '') { return false; }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }

  public loggedOut() {
    const elem = <HTMLElement>document.querySelector('#loggedOut');
    if (elem) { elem.click(); }
  }

}
