import React from "react";
import { useProgressViewController } from "./progress.controller";
import { Layout, PaddedView, TitleArea } from "../../../shared";
import { ProgressStep } from "../../components";
import { style } from "./progress.style";

export function ProgressView() {
    const themes = useProgressViewController();
    
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
