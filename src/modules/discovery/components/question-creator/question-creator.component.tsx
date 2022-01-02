import React from "react";
import { Theme } from "@quizz-service/quizz-lib-v1";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Input, PaddedView, TitleArea } from "../../../shared";
import { style } from "../../views/progress/progress.style";
import { useQuestionCreatorController } from "./question-creator.controller";

import greenCheckIcon from "../../../../media/images/icons/check_green.png";
import redCheckIcon from "../../../../media/images/icons/check_red.png";
import trashIcon from "../../../../media/images/icons/trash_icon.png";
import plusIcon from "../../../../media/images/icons/circle_plus_icon.png";
import { useCustomBackNav } from "../../../../utils";

interface QuestionCreatorProps {
    theme: Theme;
}

export function QuestionCreator(props: QuestionCreatorProps) {
    const { theme } = props;
    const {
        onQuestionInput,
        formState,
        saveQuestion,
        markAnswerAsCorrect,
        onAnswerInput,
        removeAnswer,
        addNewAnswer,
        clearDiscoveryContext,
    } = useQuestionCreatorController(theme.id!);
    
    useCustomBackNav(() => {
        clearDiscoveryContext();
        return true;
    });
    
    return (
        <>
            <TitleArea title={"Napiši vprašanje na izbrano temo."} textStyle={style.titleText} />
            <PaddedView padding={15} containerStyle={style.container}>
                
                <View style={style.inputContainer}>
                    
                    <Input numberOfLines={5}
                        containerStyle={[style.input, style.firstInput]}
                        style={style.inputInner}
                        value={formState.question}
                        label="Vprašanje:"
                        onInput={text => {
                            onQuestionInput(text);
                        }}
                    />
                
                </View>
                
                <View style={style.contentContainer}>
                    <View>
                        {formState.answers.map((ans, i) => (
                            <View key={i} style={style.answerInput}>
                                <TouchableOpacity style={style.actionButton} onPress={() => {
                                    markAnswerAsCorrect(i);
                                }}>
                                    <Image source={ans.correct ? greenCheckIcon : redCheckIcon} width={15}
                                        height={15} />
                                </TouchableOpacity>
                                
                                <View style={style.answerInputContainer}>
                                    <Input
                                        style={style.answerInputInner}
                                        value={ans.text}
                                        onInput={text => {
                                            onAnswerInput(i, text);
                                        }}
                                    />
                                </View>
                                
                                <TouchableOpacity style={style.actionButton} onPress={() => {
                                    removeAnswer(i);
                                }}>
                                    <Image source={trashIcon} width={15} height={15} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    
                    <View style={style.addAnswerButton}>
                        <TouchableOpacity style={style.actionButton} onPress={() => {
                            addNewAnswer();
                        }}>
                            <Image source={plusIcon} width={15} height={15} />
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={[style.addAnswerButton, style.saveButton]}>
                    <Button label="Shrani" onClick={() => {
                        saveQuestion();
                    }} />
                </View>
            
            </PaddedView>
        </>
    );
}
