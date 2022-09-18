import { Question, Answer, Exam } from 'app/models/exam.model';

export class ExamSetExamStartTimer {
    static readonly type = '[Exam] Set exam start timer';
    constructor(public payload: number) { }
}

export class ExamSetExamEnableTimer {
    static readonly type = '[Exam] Set exam enable timer';
    constructor(public payload: number) { }
}

export class ExamSetDetails {
    static readonly type = '[Exam] Set details';
    constructor(public payload: Exam) { }
}

export class ExamSetQuestions {
    static readonly type = '[Exam] Set questions';
    constructor(public payload: Question[]) { }
}

export class ExamSetAnswer {
    static readonly type = '[Exam] Set answer';
    constructor(public payload: Answer) { }
}

export class ExamActivateQuestion {
    static readonly type = '[Exam] Set question active by question id';
    constructor(public payload: number) { }
}

export class ExamActivateQuestionByIndex {
    static readonly type = '[Exam] Set question active by index';
    constructor(public payload: number) { }
}
