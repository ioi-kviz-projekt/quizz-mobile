import React from "react";
import { Layout, PaddedView } from "../../../shared";
import { useQuizFlow } from "./quiz/quiz.state";
import { QuizQuestion, QuizViewer } from "../../components";
import { useCustomBackNav } from "../../../../utils";

export function LobbyView() {
    const { state, answerQuestion } = useQuizFlow();
    
    useCustomBackNav(() => {
        return true;
    });
    
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
