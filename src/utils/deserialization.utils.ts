import { QuestionResponse, StateChangeResponse } from "@quizz-service/quizz-lib-v1";

export function deserializeStateChangeResponse(payload: string): StateChangeResponse {
    const parsedPayload = Object.assign({}, JSON.parse(payload) as StateChangeResponse);
    parsedPayload.endsAt = new Date(parsedPayload.endsAt);
    return parsedPayload;
}

export function deserializeQuestionResponse(payload: string): QuestionResponse {
    const parsedPayload = Object.assign({}, JSON.parse(payload) as QuestionResponse);
    parsedPayload.endsAt = new Date(parsedPayload.endsAt);
    return parsedPayload;
}

interface WithEndDate {
    endsAt: Date;
}

export function deserializeWithEndDate<T extends WithEndDate>(payload: string): T {
    const parsedPayload = Object.assign({}, JSON.parse(payload) as T);
    parsedPayload.endsAt = new Date(parsedPayload.endsAt);
    return parsedPayload;
}
