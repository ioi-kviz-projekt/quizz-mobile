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
                            <>
                                <TitleArea title={"Napiši dve vprašanji na izbrano temo."} textStyle={style.titleText} />
                                <PaddedView padding={40} containerStyle={style.container}>
                                    <Input numberOfLines={5}
                                        containerStyle={[style.input, style.firstInput]}
                                        style={style.inputInner}
                                        value={""}
                                        label="Vprašanje 1"
                                        onInput={text => {
                                        
                                        }}
                                    />
    
                                    <Input numberOfLines={5}
                                        containerStyle={style.input}
                                        style={style.inputInner}
                                        value={""}
                                        label="Vprašanje 2"
                                        onInput={text => {
            
                                        }}
                                    />
                                </PaddedView>
                            </>
                        )
                    
                    )}
                </DiscoveryContext>
            </DiscoveryContextProvider>
        
        
        </Layout>
    );
}
