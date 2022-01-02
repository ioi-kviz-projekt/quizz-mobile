import { useState } from "react";
import { take } from "rxjs";
import { QuestionCreateRequest } from "@quizz-service/quizz-lib-v1";
import { useDiscoveryContext, useRoomContext } from "../../../../context";
import { ServicesFactory, QuestionService } from "../../../../services";


interface QuestionForm {
    question: string;
    answers: {
        text: string;
        correct: boolean;
    }[];
}

export function useQuestionCreatorController(themeId: string) {
    const [formState, setFormState] = useState<QuestionForm>({
        question: "",
        answers: [{ text: "", correct: true }],
    });
    const { context: roomContext } = useRoomContext();
    const { clearContext: clearDiscoveryContext } = useDiscoveryContext();
    
    return {
        formState,
        clearDiscoveryContext,
        onQuestionInput: function(newInput: string) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    question: newInput,
                };
            });
        },
        addNewAnswer: function() {
            setFormState(prevState => {
                return {
                    ...prevState,
                    answers: [
                        ...prevState.answers,
                        { text: "", correct: false },
                    ],
                };
            });
        },
        removeAnswer: function(index: number) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    answers: prevState.answers.filter((_, i: number) => i !== index),
                };
            });
        },
        onAnswerInput: function(index: number, newInput: string) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    answers: prevState.answers.map((ans, i: number) => {
                        if (i === index) {
                            return {
                                ...ans,
                                text: newInput,
                            };
                        }
                        return ans;
                    }),
                };
            });
        },
        markAnswerAsCorrect: function(index: number) {
            setFormState(prevState => {
                return {
                    ...prevState,
                    answers: prevState.answers.map((ans, i: number) => {
                        if (i === index) {
                            return {
                                ...ans,
                                correct: true,
                            };
                        }
                        return {
                            ...ans,
                            correct: false,
                        };
                    }),
                };
            });
        },
        saveQuestion: function() {
            const request: QuestionCreateRequest = {
                roomId: roomContext.room!.id!,
                themeId: themeId,
                question: formState.question,
                answers: formState.answers,
            };
            
            ServicesFactory.get(QuestionService).addQuestion(request)
                .pipe(take(1))
                .subscribe({
                    next: () => {
                        console.log("SAVED!");
                        clearDiscoveryContext();
                    },
                    error: err => {
                        console.error(err);
                    },
                });
        },
    };
}
