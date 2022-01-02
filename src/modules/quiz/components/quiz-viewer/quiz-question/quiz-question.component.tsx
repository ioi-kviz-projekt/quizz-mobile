import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { QuestionAnswer, ThemeQuestion } from "@quizz-service/quizz-lib-v1";

import { style } from "./quiz-question.style";
import { Shadow } from "react-native-shadow-2";

interface QuestionAnswersProps {
    question: ThemeQuestion;
    answers: QuestionAnswer[];
    answerId: string | null,
    onAnswer: (questionId: string, answerId: string) => void;
}

function getAnswerStyle(answerId: string, selectedAnswerId: string | null) {
    if (selectedAnswerId !== null && answerId === selectedAnswerId) {
        return [style.answer, style.selectedAnswer];
    }
    
    return [style.answer];
}

function getAnswerTextStyle(answerId: string, selectedAnswerId: string | null) {
    if (selectedAnswerId !== null && answerId === selectedAnswerId) {
        return [style.answerText, style.selectedAnswerText];
    }
    
    return [style.answerText];
}

export function QuestionAnswers(props: QuestionAnswersProps) {
    const { question, answers, onAnswer, answerId } = props;
    
    return (
        <View style={style.container}>
            {answers.map((answer) => (
                <View key={answer.id} style={style.answerContainer}>
                    <Shadow distance={3} offset={[2, 3]}
                        viewStyle={style.shadowContainer}
                    >
                        <TouchableOpacity style={getAnswerStyle(answer.id!, answerId)} onPress={() => {
                            onAnswer(question.id!, answer.id!);
                        }}>
                            <Text style={getAnswerTextStyle(answer.id!, answerId)}>{answer.content}</Text>
                        </TouchableOpacity>
                    </Shadow>
                </View>
            ))}
        </View>
    );
}
