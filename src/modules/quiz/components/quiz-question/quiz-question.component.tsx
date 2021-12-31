import React from "react";
import { TitleArea } from "../../../shared";
import { QuizState, QuizStateStatus } from "../../types";
import { View } from "react-native";


interface QuizQuestionProps {
    state: QuizState;
}

export function QuizQuestion(props: QuizQuestionProps) {
    const { state } = props;
    
    if (state.status === QuizStateStatus.CONNECTING) {
        return <TitleArea title="Počakaj, da kviz prične!" />;
    }
    if (state.status === QuizStateStatus.LOADING) {
        return <TitleArea title="Pripravi se na naslednje vprašanje!" />;
    }
    if (state.status === QuizStateStatus.FINISHED) {
        return <TitleArea title="Končano!" />;
    }
    if (state.status === QuizStateStatus.QUESTION || state.status === QuizStateStatus.ANSWERED) {
        return <TitleArea title={state.question.content} />;
    }
    return <View />;
}
