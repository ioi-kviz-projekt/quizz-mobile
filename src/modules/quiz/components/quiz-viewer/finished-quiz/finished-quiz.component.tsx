import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { take } from "rxjs";
import { QuizSummary } from "@quizz-service/quizz-lib-v1";
import { QuizService, ServicesFactory } from "../../../../../services";
import { style } from "./finished-quiz.style";
import { Button } from "../../../../shared";
import { useBackHandler } from "../../../../../utils";
import { TabRoute, ViewRoute } from "../../../../../routes";
import { QuizState, QuizStateStatus } from "../../../types";

interface FinishedQuizProps {
    quizId: string;
    quizState: QuizState;
}

export function FinishedQuiz(props: FinishedQuizProps) {
    const { quizId, quizState } = props;
    const back = useBackHandler();
    
    const [summary, setSummary] = useState<QuizSummary | null>(null);
    
    useEffect(() => {
        if (quizState.status === QuizStateStatus.FINISHED) {
            ServicesFactory.get(QuizService).getQuizzSummary(quizId)
                .pipe(take(1))
                .subscribe({
                    next: s => {
                        setSummary(s);
                    },
                });
        }
    }, [quizState.status]);
    
    return (
        <View style={style.container}>
            {summary !== null && (
                <View style={style.scorebox}>
                    <Text style={style.scoreboxText}>{summary.correct} / {summary.total}</Text>
                    <Text style={style.scoreboxText}>točk</Text>
                </View>
            )}
            
            <View>
                <Button label="Zaključi" onClick={() => {
                    back(TabRoute.HOME, ViewRoute.HOME);
                }}/>
            </View>
        </View>
    );
}
