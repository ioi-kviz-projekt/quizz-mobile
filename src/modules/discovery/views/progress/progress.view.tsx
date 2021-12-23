import React from "react";

import { Layout, PaddedView, TitleArea } from "../../../shared";
import { useBackHandler, useCustomBackNav } from "../../../../utils";
import { TabRoute, ViewRoute } from "../../../../routes";

import { useProgressViewController } from "./progress.controller";
import { ProgressStep } from "../../components";
import { style } from "./progress.style";

export function ProgressView() {
    const themes = useProgressViewController();
    
    const back = useBackHandler();
    useCustomBackNav(() => {
        back(TabRoute.HOME, ViewRoute.HOME);
        return true;
    });
    
    return (
        <Layout>
            <TitleArea title={"Izberi poglavje ki te zanima"} textStyle={style.titleText} />
            <PaddedView padding={40} containerStyle={style.container}>
                {themes.map(theme => (
                    <ProgressStep label={theme.title} shown={theme.discovered} key={theme.id} />
                ))}
            </PaddedView>
        </Layout>
    );
}
