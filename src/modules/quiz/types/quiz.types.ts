import { BaseError } from "../../../types";
import { QuestionAnswer, ThemeQuestion } from "@quizz-service/quizz-lib-v1";

export enum QuizActionType {
    ERRORED = "quiz/errored",
    CONNECT = "quiz/connect",
    QUIZ_STARTED = "quiz/quiz-started",
    QUESTION_LOADED = "quiz/question-loaded",
    QUESTION_ANSWERED = "quiz/question-answered",
    QUESTION_TIMEOUT = "quiz/question-timeout",
    QUIZ_FINISHED = "quiz/quiz-finished",
}

export type QuizStateAction =
    { type: QuizActionType.ERRORED, error: BaseError | Error }
    | { type: QuizActionType.CONNECT }
    | { type: QuizActionType.QUIZ_STARTED, endsAt: Date }
    | { type: QuizActionType.QUESTION_LOADED, endsAt: Date, question: ThemeQuestion, answers: QuestionAnswer[] }
    | { type: QuizActionType.QUESTION_ANSWERED, answerId: string }
    | { type: QuizActionType.QUESTION_TIMEOUT, endsAt: Date }
    | { type: QuizActionType.QUIZ_FINISHED, quizId: string };

export enum QuizStateStatus {
    ERROR = "error",
    CONNECTING = "connecting",
    WAITING_START = "waiting-start",
    LOADING = "loading",
    QUESTION = "question",
    ANSWERED = "answered",
    FINISHED = "finished",
}

export type QuizState =
    { status: QuizStateStatus.ERROR, error: BaseError | Error }
    | { status: QuizStateStatus.CONNECTING }
    | { status: QuizStateStatus.WAITING_START }
    | { status: QuizStateStatus.LOADING, endsAt: Date }
    | { status: QuizStateStatus.QUESTION, question: ThemeQuestion, answers: QuestionAnswer[], endsAt: Date }
    | { status: QuizStateStatus.ANSWERED, question: ThemeQuestion, answers: QuestionAnswer[], endsAt: Date, answerId: string }
    | { status: QuizStateStatus.FINISHED, quizId: string };
