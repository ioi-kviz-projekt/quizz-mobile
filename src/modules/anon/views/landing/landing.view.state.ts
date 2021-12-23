import { Student } from "@quizz-service/quizz-lib-v1";
import { BaseError } from "../../../../types";

export enum LandingViewStateActionType {
    START_LOADING = "landing/start-loading",
    FOUND_USER = "landing/found-user",
    NOT_FOUND_USER = "landing/not-found-user",
    ERRORED = "landing/errored",
}

export type LandingViewStateAction =
    { type: LandingViewStateActionType.START_LOADING }
    | { type: LandingViewStateActionType.ERRORED, error: BaseError | Error }
    | { type: LandingViewStateActionType.FOUND_USER, student: Student }
    | { type: LandingViewStateActionType.NOT_FOUND_USER };

export enum LandingViewStateStatus {
    EMPTY = "empty",
    LOADING = "loading",
    USER_FOUND = "user-found",
    NO_USER = "no-user",
    ERROR = "error"
}

export const LandingStatus = LandingViewStateStatus;

export type LandingViewState =
    { status: LandingViewStateStatus.EMPTY }
    | { status: LandingViewStateStatus.LOADING }
    | { status: LandingViewStateStatus.ERROR, error: BaseError | Error }
    | { status: LandingViewStateStatus.USER_FOUND, student: Student }
    | { status: LandingViewStateStatus.NO_USER };


export function LandingViewStateReducer(previousState: LandingViewState, action: LandingViewStateAction): LandingViewState {
    switch (action.type) {
        case LandingViewStateActionType.ERRORED:
            return {
                status: LandingViewStateStatus.ERROR,
                error: action.error,
            };
        case LandingViewStateActionType.START_LOADING:
            return {
                status: LandingViewStateStatus.LOADING,
            };
        case LandingViewStateActionType.FOUND_USER:
            return {
                status: LandingViewStateStatus.USER_FOUND,
                student: action.student,
            };
        case LandingViewStateActionType.NOT_FOUND_USER:
            return {
                status: LandingViewStateStatus.NO_USER,
            };
    }
    return previousState;
}

export interface LandingViewFormState {
    fields: {
        roomNumber: string;
        fullName: string;
    };
    errors?: {
        roomNumber?: string;
        fullName?: string;
    };
}
