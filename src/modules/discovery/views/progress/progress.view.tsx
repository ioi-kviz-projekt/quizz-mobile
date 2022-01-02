import React from "react";
import { View } from "react-native";
import { fromDiscoverable } from "@quizz-service/quizz-lib-v1";

import { Input, Layout, PaddedView, TitleArea } from "../../../shared";
import { useBackHandler, useCustomBackNav } from "../../../../utils";
import { TabRoute, ViewRoute } from "../../../../routes";

import { useProgressViewController } from "./progress.controller";
import { ProgressStep } from "../../components";
import { style } from "./progress.style";
import { DiscoveryContext, DiscoveryContextProvider } from "../../../../context";
import { QuestionCreator } from "../../components/question-creator/question-creator.component";


export function ProgressView() {
    const themes = useProgressViewController();
    
    const back = useBackHandler();
    useCustomBackNav(() => {
        back(TabRoute.HOME, ViewRoute.HOME);
        return true;
    });
    
    return (
        <Layout>
            <DiscoveryContextProvider>
                <DiscoveryContext>
                    {context => (
                        context.state.theme === null ? (
                            <>
                                <TitleArea title={"Izberi poglavje ki te zanima"} textStyle={style.titleText} />
                                <PaddedView padding={40} containerStyle={style.container}>
                                    {themes.map(theme => (
                                        <ProgressStep label={theme.title}
                                            shown={theme.discovered}
                                            key={theme.id}
                                            onClick={() => {
                                                context.setter({
                                                    theme: fromDiscoverable(theme),
                                                });
                                            }}
                                        />
                                    ))}
                                </PaddedView>
                            </>
                        ) : (
                            <QuestionCreator theme={context.state.theme} />
                        )
                    
                    )}
                </DiscoveryContext>
            </DiscoveryContextProvider>
        
        
        </Layout>
    );
}
