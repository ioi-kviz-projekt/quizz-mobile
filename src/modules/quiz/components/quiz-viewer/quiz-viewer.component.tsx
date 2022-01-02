import React from "react";
import { ActivityIndicator, View } from "react-native";
import { QuizState, QuizStateStatus } from "../../types";
import { Color } from "../../../../styles";
import { style } from "./quiz-viewer.style";
import { FinishedQuiz } from "./finished-quiz/finished-quiz.component";
import { QuestionAnswers } from "./quiz-question/quiz-question.component";
import { Timer } from "../timer/timer.component";
import { Button } from "../../../shared";
import { useBackHandler } from "../../../../utils";
import { TabRoute, ViewRoute } from "../../../../routes";

interface QuizViewerProps {
    state: QuizState;
    onAnswer: (questionId: string, answerId: string) => void;
}

export function QuizViewer(props: QuizViewerProps) {
    const { state, onAnswer } = props;
    const back = useBackHandler();
    
    if (state.status === QuizStateStatus.CONNECTING) {
        return (
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color={Color.RED} style={style.loadingSpinner} />
                
                <View style={style.backContainer}>
                    <Button label="Nazaj" onClick={() => {
                        back(TabRoute.HOME, ViewRoute.HOME);
                    }}/>
                </View>
            </View>
        );
    }
    
    if (state.status === QuizStateStatus.LOADING) {
        return (
            <View style={style.loadingContainer}>
                <ActivityIndicator size="large" color={Color.GREEN} style={style.loadingSpinner} />
            </View>
        );
    }
    
    if (state.status === QuizStateStatus.FINISHED) {
        return (
            <FinishedQuiz quizId={state.quizId} quizState={state}/>
        );
    }
    
    if (state.status === QuizStateStatus.QUESTION || state.status === QuizStateStatus.ANSWERED) {
        const { answers, question } = state;
        let selectedAnswerId: string | null = null;
        if (state.status === QuizStateStatus.ANSWERED) {
            selectedAnswerId = state.answerId;
        }
        return (
            <View>
                <View style={style.timerContainer}>
                    <Timer until={state.endsAt}/>
                </View>
                <QuestionAnswers
                    answerId={selectedAnswerId}
                    answers={answers}
                    question={question}
                    onAnswer={onAnswer}
                />
            </View>
        );
    }
    
    return <View />;
}
