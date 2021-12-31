import React from "react";
import { Text, View } from "react-native";
import { QuizState, QuizStateStatus } from "../../types";

interface QuizViewerProps {
    state: QuizState;
    onAnswer: (questionId: string, answerId: string) => void;
}

function SimpleText({ text }: { text: string }) {
    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}

export function QuizViewer(props: QuizViewerProps) {
    const { state, onAnswer } = props;
    
    if (state.status === QuizStateStatus.CONNECTING) {
        return (
            <SimpleText text="Connecting..." />
        );
    }
    
    if (state.status === QuizStateStatus.LOADING) {
        return (
            <SimpleText text="Loading..." />
        );
    }
    
    if (state.status === QuizStateStatus.FINISHED) {
        return (
            <SimpleText text="Finished!" />
        );
    }
    
    if (state.status === QuizStateStatus.QUESTION || state.status === QuizStateStatus.ANSWERED) {
        return (
            <View>
                {state.answers.map((answer) => (
                    <View key={answer.id}>
                        <Text>{answer.content}</Text>
                    </View>
                ))}
            </View>
        );
    }
    
    return <View />;
}
