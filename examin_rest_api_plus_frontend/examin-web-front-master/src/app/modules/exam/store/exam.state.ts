import { Injectable } from '@angular/core';
import { State, Action, StateContext, Select, Store, Selector } from '@ngxs/store';
import { Question, Answer, Exam } from 'app/models/exam.model';
import { ExamSetExamStartTimer, ExamSetExamEnableTimer, ExamSetQuestions, ExamSetAnswer,
     ExamActivateQuestion, ExamActivateQuestionByIndex, ExamSetDetails } from './exam.actions';
import { ExamService } from 'app/shared/services/exam.service';
import { tap } from 'rxjs/operators';

export interface ExamStateModel {
    exam: Exam,
    activeQuestionProps: {
        index: number;
        isLast: boolean;
        isFirst: boolean;
        questionId: number;
    },
    questions: Question[],
    examEnableTimer: number,
    examStartTimer: number,
}

@State<ExamStateModel>({
    name: 'exam',
    defaults: {
        exam: null,
        questions: [],
        examEnableTimer: null,
        examStartTimer: null,
        activeQuestionProps: {
            index: null,
            isLast: false,
            isFirst: false,
            questionId: null
        }
    }
})
@Injectable()
export class ExamState {

    constructor(
        private examService: ExamService,
        private store: Store
    ) { }



    /* ==================== SELECTORS STARTS ==================== */
    @Selector()
    static getExamEnableTimer(state: ExamStateModel) {
        return state.examEnableTimer;
    }

    @Selector()
    static getExamStartTimer(state: ExamStateModel) {
        return state.examStartTimer;
    }
    
    @Selector()
    static getQuestions(state: ExamStateModel) {
        return state.questions;
    }

    @Selector()
    static getAnsweredQuestions(state: ExamStateModel) {
        return state.questions.filter((q) => q.userAnswer !== null).length;
    }

    @Selector()
    static getUnansweredQuestions(state: ExamStateModel) {
        return state.questions.filter((q) => q.userAnswer === null).length;
    }

    @Selector()
    static getQuestionsCount(state: ExamStateModel) {
        return state.questions.length;
    }

    @Selector()
    static getActiveQuestion(state: ExamStateModel): Question {
        const q = state.activeQuestionProps;
        return state.questions[q.index];
    }

    @Selector()
    static getActiveQuestionProps(state: ExamStateModel): { index, questionId } {
        return state.activeQuestionProps;
    }
    /* ==================== SELECTORS STARTS ==================== */



    /* ==================== ACTIONS STARTS ==================== */
    @Action(ExamSetExamStartTimer)
    setExamStartTimer(ctx: StateContext<ExamStateModel>, { payload }: ExamSetExamStartTimer) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            examStartTimer: payload
        });
    }

    @Action(ExamSetExamEnableTimer)
    setExamEnableTimer(ctx: StateContext<ExamStateModel>, { payload }: ExamSetExamEnableTimer) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            examEnableTimer: payload
        });
    }

    @Action(ExamSetDetails)
    setExamDetails(ctx: StateContext<ExamStateModel>, { payload }: ExamSetDetails) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            exam: payload
        });
    }

    @Action(ExamSetQuestions)
    setQuestions(ctx: StateContext<ExamStateModel>, { payload }: ExamSetQuestions) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            questions: this.questionsInitialState(payload)
        });
    }

    @Action(ExamSetAnswer)
    setAnswer(ctx: StateContext<ExamStateModel>, { payload }: ExamSetAnswer) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            questions: state.questions.map(question => question.questionId === payload.questionId ? {
                ...question,
                answered: true,
                userAnswer: payload.userAnswer
            } : question)
        });

        // save the user answer to the DB
        return this.examService.saveAnswers(state.exam.examId, [payload]).pipe(tap(() => {}));
    }

    @Action(ExamActivateQuestionByIndex)
    activateQuestionByIndex(ctx: StateContext<ExamStateModel>, { payload }: ExamActivateQuestionByIndex) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            activeQuestionProps: {
                ...state.activeQuestionProps,
                index: payload,
                questionId: state.questions[payload].questionId,
                isFirst: payload === 0 ? true : false,
                isLast: payload === (state.questions.length - 1) ? true : false
            },
            questions: state.questions.map((question, index) => index === payload ? {
                ...question,
                active: true,
            } : {
                ...question,
                active: false,
            })
        });
    }

    @Action(ExamActivateQuestion)
    activateQuestion(ctx: StateContext<ExamStateModel>, { payload }: ExamActivateQuestion) {
        const state = ctx.getState();
        const newIndex = state.questions.findIndex(q => q.questionId === payload);
        ctx.setState({
            ...state,
            activeQuestionProps: {
                ...state.activeQuestionProps,
                questionId: payload,
                index: newIndex,
                isFirst: newIndex === 0 ? true : false,
                isLast: newIndex === (state.questions.length - 1) ? true : false
            },
            questions: state.questions.map(question => question.questionId === payload ? {
                ...question,
                active: true,
            } : {
                ...question,
                active: false,
            })
        });
    }
    /* ==================== ACTIONS ENDS ==================== */



    /**
     * initializing the questions state
     */
    questionsInitialState(questions) {
        // set initial values for question params like attempted
        for (let i = 0; i < questions.length; i++) {
            questions[i].active = false;
            questions[i].attempted = false;
        }
        return questions;
    }
}
