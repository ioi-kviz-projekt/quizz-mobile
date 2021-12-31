import React from "react";
import { Layout, PaddedView } from "../../../shared";
import { useQuizFlow } from "./quiz/quiz.state";
import { QuizQuestion, QuizViewer } from "../../components";

export function LobbyView() {
    const { state, answerQuestion } = useQuizFlow();
    
    return (
        <Layout>
            <QuizQuestion state={state}/>
            <PaddedView>
                <QuizViewer state={state} onAnswer={((questionId, answerId) => {
                    answerQuestion(questionId, answerId);
                })} />
            </PaddedView>
        </Layout>
    );
}
