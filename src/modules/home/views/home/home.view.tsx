import React from "react";
import { ExpandableButton, Layout, PaddedView, TitleArea } from "../../../shared";
import { useUserInfo } from "../../../../utils";
import { style } from "./home.style";

export function HomeView() {
    const user = useUserInfo();
    
    return (
        <Layout>
            <TitleArea title={"Pozdravljen, " + user.username + "!"} />
            <PaddedView containerStyle={style.content}>
                
                <ExpandableButton
                    label="Sestavi nalogo"
                    expandedText="V skupini se sprehodite po razstavi in sestavite naloge za skupinsko igro."
                    containerStyle={style.firstButton}
                    onClick={() => {
                    
                    }} />
                
                <ExpandableButton
                    label="Začni igro"
                    expandedText="Skupaj v razredu rešite naloge, ki ste jih sestavili po skupinah."
                    onClick={() => {
                    
                    }} />
            
            </PaddedView>
        </Layout>
    );
}
