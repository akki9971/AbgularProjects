import { Institute } from './institute.model';
import { University } from './university.model';
import { Scholarship } from './scholarship.model';

export class Exam {
    examId?: number;
    title?: string;
    description?: string;
    feeAmount?: any;
    currency?: string;
    payment?: any;
    institute?: Institute;
    scholarship?: Scholarship | boolean;
    university?: University | boolean;
    isDemo: boolean;
    instantResult?: boolean;
    webcamCapture?: boolean;
}

// export class ExamState {
//     exam: Exam;
//     quiz: QuizState;
// }

// export class QuizState {
//     questions: Question[];
//     attemptedIds: number[];
//     answers: Answer[];
// }

// export class ExamProgress {
//     questionsAttempted?: number;
//     questionsAttemptedIds?: number[];
//     answers?: Answer[];
// }

export class Answer {
    examId: number;
    questionId: number;
    userAnswer: string;
    correctAnswer?: string;
}

export class Question {
    examId: number;
    questionId: number;
    questionL1: string;
    questionL2: string;
    AL1: string;
    AL2: string;
    BL1: string;
    BL2: string;
    CL1: string;
    CL2: string;
    DL1: string;
    DL2: string;
    active: boolean;
    attempted: boolean;
    userAnswer?: string;
    correctAnswer?: string;
}
