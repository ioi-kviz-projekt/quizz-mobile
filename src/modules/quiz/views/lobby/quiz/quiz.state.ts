import { Dispatch, useEffect, useReducer } from "react";
import { Subject, take, takeUntil } from "rxjs";
import { getUniqueId } from "react-native-device-info";
import { ActiveQuizState, SocketMessage, StateChangeResponse } from "@quizz-service/quizz-lib-v1";

import { useRoomContext } from "../../../../../context";
import { QuizWsService, RoomService, ServicesFactory } from "../../../../../services";
import { deserializeQuestionResponse, deserializeWithEndDate } from "../../../../../utils";

import { QuizActionType, QuizState, QuizStateAction, QuizStateStatus } from "../../../types";
import { BaseError, NotFoundError } from "../../../../../types";


export function QuizFlowReducer(previousState: QuizState, action: QuizStateAction): QuizState {
    switch (action.type) {
        case QuizActionType.ERRORED:
            return {
                status: QuizStateStatus.ERROR,
                error: action.error,
            };
        case QuizActionType.CONNECT:
            return {
                status: QuizStateStatus.CONNECTING,
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
                quizId: action.quizId,
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
        const quizId = message.payload;
        stateDispatcher({
            type: QuizActionType.QUIZ_FINISHED,
            quizId: quizId!,
        });
    }
    
}


export function useQuizFlow() {
    const { context: roomContext } = useRoomContext();
    
    const [state, dispatcher] = useReducer(QuizFlowReducer, {
        status: QuizStateStatus.CONNECTING,
    });
    
    useEffect(() => {
        // retrieve current status about quiz, to resume if connection lost
        ServicesFactory.get(RoomService).getActiveQuizState(roomContext.room!.id!)
            .pipe(take(1))
            .subscribe({
                next: (quizInstance: ActiveQuizState) => {
                    if (quizInstance.state === "QUESTION") {
                        dispatcher({
                            type: QuizActionType.QUESTION_LOADED,
                            question: quizInstance.question,
                            answers: quizInstance.answers,
                            endsAt: quizInstance.endsAt,
                        });
                    } else if (quizInstance.state === "WAITING") {
                        dispatcher({
                            type: QuizActionType.QUIZ_STARTED,
                            endsAt: quizInstance.endsAt,
                        });
                    } else {
                        dispatcher({
                            type: QuizActionType.CONNECT,
                        });
                    }
                },
                error: (err: BaseError) => {
                    if (!(err instanceof NotFoundError)) {
                        console.error(err);
                    }
                },
            });
    }, []);
    
    useEffect(() => {
        QuizWsService.getInstance().connectAndRegister();
        
        return () => {
            QuizWsService.getInstance().close();
        };
    }, []);
    
    useEffect(() => {
        const destroy$ = new Subject<boolean>();
        
        QuizWsService.getInstance().listen()
            .pipe(takeUntil(destroy$))
            .subscribe({
                next: message => {
                    socketMessageHandler(message, dispatcher);
                },
                error: err => {
                    console.error(err);
                    dispatcher({
                        type: QuizActionType.ERRORED,
                        error: err,
                    });
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
