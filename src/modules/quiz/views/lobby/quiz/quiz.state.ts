import { Dispatch, useEffect, useReducer } from "react";
import { Subject, take, takeUntil } from "rxjs";
import { getUniqueId } from "react-native-device-info";
import { QuizInstance, SocketMessage, StateChangeResponse } from "@quizz-service/quizz-lib-v1";

import { useRoomContext } from "../../../../../context";
import { RoomService, ServicesFactory, QuizWsService } from "../../../../../services";
import { deserializeQuestionResponse, deserializeWithEndDate } from "../../../../../utils";

import { QuizActionType, QuizState, QuizStateAction, QuizStateStatus } from "../../../types";
import { QuizQuestion } from "../../../components";


export function QuizFlowReducer(previousState: QuizState, action: QuizStateAction): QuizState {
    switch (action.type) {
        case QuizActionType.ERRORED:
            return {
                status: QuizStateStatus.ERROR,
                error: action.error,
            };
        case QuizActionType.QUIZ_STARTED:
            return {
                status: QuizStateStatus.LOADING,
                endsAt: action.endsAt,
            };
        case QuizActionType.QUESTION_LOADED:
            return {
                status: QuizStateStatus.QUESTION,
                question: action.question,
                answers: action.answers,
                endsAt: action.endsAt,
            };
        case QuizActionType.QUESTION_ANSWERED:
            if (previousState.status === QuizStateStatus.QUESTION) {
                return {
                    status: QuizStateStatus.ANSWERED,
                    question: previousState.question,
                    answers: previousState.answers,
                    endsAt: previousState.endsAt,
                    answerId: action.answerId,
                };
            }
            return previousState;
        case QuizActionType.QUESTION_TIMEOUT:
            return {
                status: QuizStateStatus.LOADING,
                endsAt: action.endsAt,
            };
        case QuizActionType.QUIZ_FINISHED:
            return {
                status: QuizStateStatus.FINISHED,
            };
        default:
            return previousState;
    }
}

function socketMessageHandler(message: SocketMessage, stateDispatcher: Dispatch<QuizStateAction>): void {
    
    if (message.type === SocketMessage.Type.START) {
        const payload = deserializeWithEndDate<StateChangeResponse>(message.payload!);
        stateDispatcher({
            type: QuizActionType.QUIZ_STARTED,
            endsAt: payload.endsAt,
        });
    }
    
    if (message.type === SocketMessage.Type.QUESTION) {
        const payload = deserializeQuestionResponse(message.payload!);
        stateDispatcher({
            type: QuizActionType.QUESTION_LOADED,
            endsAt: payload.endsAt,
            answers: payload.answers,
            question: payload.question,
        });
    }
    
    if (message.type === SocketMessage.Type.WAITING) {
        const payload = deserializeWithEndDate<StateChangeResponse>(message.payload!);
        stateDispatcher({
            type: QuizActionType.QUESTION_TIMEOUT,
            endsAt: payload.endsAt,
        });
    }
    if (message.type === SocketMessage.Type.FINISHED) {
        stateDispatcher({
            type: QuizActionType.QUIZ_FINISHED,
        });
    }
    
}


export function useQuizFlow() {
    const { context: roomContext } = useRoomContext();
    
    const [state, dispatcher] = useReducer(QuizFlowReducer, {
        status: QuizStateStatus.CONNECTING,
    });
    
    useEffect(() => {
        // retrieve current status about quiz
        ServicesFactory.get(RoomService).getActiveQuiz(roomContext.room!.id!)
            .pipe(take(1))
            .subscribe({
                // TODO: populate quiz instance
                next: (_: QuizInstance) => {
                },
            });
    }, []);
    
    useEffect(() => {
        QuizWsService.getInstance().connectAndRegister();
    }, []);
    
    useEffect(() => {
        const destroy$ = new Subject<boolean>();
        
        QuizWsService.getInstance().listen()
            .pipe(takeUntil(destroy$))
            .subscribe({
                next: message => {
                    socketMessageHandler(message, dispatcher);
                },
            });
        
        return () => {
            destroy$.next(true);
        };
    }, []);
    
    return {
        state,
        answerQuestion: function(questionId: string, answerId: string) {
            if (state.status === QuizStateStatus.QUESTION) {
                const socketMessage: SocketMessage = {
                    type: SocketMessage.Type.ANSWER,
                    accessToken: getUniqueId(),
                    payload: JSON.stringify({
                        questionId,
                        answerId,
                        roomId: roomContext.room!.id!,
                    }),
                };
                
                QuizWsService.getInstance().sendMessage(socketMessage);
                dispatcher({
                    type: QuizActionType.QUESTION_ANSWERED,
                    answerId,
                });
            }
        },
    };
}
